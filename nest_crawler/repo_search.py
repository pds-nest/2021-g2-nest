from nest_backend.database import *
from . import authentication
from datetime import datetime
import tweepy as tw
from .associate_condition_tweet import associate_condition_tweet


def search_repo_conditions(repository_id):

    api = authentication.authenticate()
    repo = Repository.query.filter_by(id=repository_id).first()

    if repo is None:
        print("Non esiste una repository con questo id")
        return False
    conditions = [use for use in repo.conditions]
    if len(conditions) == 0:
        return False

    print(f"Searching tweets from repo: {repo.name}")
    evaluation_mode = repo.evaluation_mode
    conditions_type = dict()

    # Dividing condition into condition types
    for condition in conditions:
        if condition.type not in conditions_type.keys():
            conditions_type[condition.type] = [condition]
        else:
            conditions_type[condition.type].append(condition)

    queryString = ""

    queryConjunction = "OR" if (evaluation_mode == ConditionMode.all_or) else ""

    tweetsFound = []

    for types in conditions_type.keys():
        print(types, ":", conditions_type[types])
    coordinates_string = ""
    # Adding to the query string the hashtag conditions
    if ConditionType.hashtag in conditions_type.keys():
        for condition_content in conditions_type[ConditionType.hashtag]:
            queryString += ("#" + condition_content.content + " " + queryConjunction + " ")

    # Adding to the coordinates string the coordinates condition
    if ConditionType.coordinates in conditions_type.keys():
        if evaluation_mode == ConditionMode.all_and:
            if len(conditions_type[ConditionType.coordinates]) == 1:
                coordinates_tweet = conditions_type[ConditionType.coordinates][0].content.split()
                coordinates_string = coordinates_tweet[2] + "," + coordinates_tweet[3] + "," + str(float(coordinates_tweet[1])/1000) + "km"
            else:
                return None
        elif evaluation_mode == ConditionMode.all_or:
            for condition_content in conditions_type[ConditionType.coordinates]:
                coordinates_tweet = condition_content.content.split()
                coordinates_string = coordinates_tweet[2] + "," + coordinates_tweet[3] + "," + str(float(coordinates_tweet[1])/1000) + "km"
                print(coordinates_string)
                for tweet in tw.Cursor(method=api.search, q="", geocode=coordinates_string).items(10):
                    if not Tweet.query.filter_by(snowflake=str(tweet.id)).all():
                        image_url_list = ''
                        if 'media' in tweet.entities.keys():
                            for url in tweet.entities['media']:
                                image_url_list += (url['media_url_https'] + '|')
                            image_url_list = image_url_list[:-1]
                        else:
                            image_url_list = None
                        tweetDB = Tweet(snowflake=tweet.id, content=tweet.text,
                                        location=tweet.geo['coordinates'] if tweet.geo is not None else None,
                                        place=tweet.place.full_name if tweet.place is not None else None,
                                        insert_time=str(datetime.now()),
                                        poster=tweet.author.screen_name, post_time=str(tweet.created_at), image_url=image_url_list)
                        ext.session.add(tweetDB)
                        ext.session.commit()
                    if not Contains.query.filter_by(snowflake=str(tweet.id), cid=condition_content.id).all():
                        condition_associated = Contains(cid=condition_content.id, snowflake=tweet.id)
                        ext.session.add(condition_associated)
                        ext.session.commit()
                    if not Composed.query.filter_by(snowflake=str(tweet.id), rid=repository_id).all():
                        composed = Composed(rid=repository_id, snowflake=tweet.id)
                        ext.session.add(composed)
                        ext.session.commit()
    # Adding to the query string the user condition
    if ConditionType.user in conditions_type.keys():
        for condition_content in conditions_type[ConditionType.user]:
            queryString += ("from:" + condition_content.content + " " + queryConjunction + " ")
    # Adding to the query string the time condition
    if ConditionType.time in conditions_type.keys():
        for condition_content in conditions_type[ConditionType.time]:
            if condition_content.content[0] == '<':
                queryString += ("until:" + condition_content.content[2:] + " " + queryConjunction + " ")
            elif condition_content.content[0] == '>':
                queryString += ("since:" + condition_content.content[2:] + " " + queryConjunction + " ")
    # End of query string
    queryString = queryString[:-len(queryConjunction) - 1]
    print(queryString)

    if evaluation_mode == ConditionMode.all_or:
        if queryString != "":
            for tweet in tw.Cursor(method=api.search, q=queryString).items(10):
                tweetsFound.append(tweet)
                print(tweet.user.name + ' : ' + tweet.text + ' : ' + tweet.geo if tweet.geo is not None else '')
    elif evaluation_mode == ConditionMode.all_and:
        for tweet in tw.Cursor(method=api.search, q=queryString, geocode=coordinates_string).items(10):
            tweetsFound.append(tweet)
            print(tweet.user.name + ' : ' + tweet.text + ' : ' + str(tweet.geo))
    for tweet in tweetsFound:
        if not Tweet.query.filter_by(snowflake=str(tweet.id)).all():
            image_url_list = ''
            if 'media' in tweet.entities.keys():
                for url in tweet.entities['media']:
                    image_url_list += (url['media_url_https'] + '|')
                image_url_list = image_url_list[:-1]
            else:
                image_url_list = None
            tweetDB = Tweet(snowflake=tweet.id, content=tweet.text,
                            location=tweet.geo['coordinates'] if tweet.geo is not None else None,
                            place=tweet.place.full_name if tweet.place is not None else None,
                            insert_time=str(datetime.now()),
                            poster=tweet.author.screen_name, post_time=str(tweet.created_at), image_url=image_url_list)
            ext.session.add(tweetDB)
            ext.session.commit()
        if evaluation_mode == ConditionMode.all_or:
            associate_condition_tweet(conditions_type, tweet)
        elif evaluation_mode == ConditionMode.all_and:
            for condition in conditions:
                if not Contains.query.filter_by(snowflake=str(tweet.id), cid=condition.id).all():
                    condition_associated = Contains(cid=condition.id, snowflake=tweet.id)
                    ext.session.add(condition_associated)
                    ext.session.commit()
        alerts = [alert for alert in repo.alerts]
        for alert in alerts:
            alert_conditions = [condition.condition for condition in alert.conditions]
            alert_conditions_type = dict()
            for condition in alert_conditions:
                if condition.type not in alert_conditions_type.keys():
                    alert_conditions_type[condition.type] = [condition]
                else:
                    alert_conditions_type[condition.type].append(condition)
            associate_condition_tweet(alert_conditions_type, tweet)
        if not Composed.query.filter_by(snowflake=str(tweet.id), rid=repository_id).all():
            composed = Composed(rid=repository_id, snowflake=tweet.id)
            ext.session.add(composed)
            ext.session.commit()
    print(f"Done searching tweets from repo: {repo.name}")


__all__ = (
    "search_repo_conditions",
)
