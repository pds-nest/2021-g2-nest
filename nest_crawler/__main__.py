from nest_backend.app import app
from nest_backend.database import *
import tweepy as tw
from datetime import datetime

ext.init_app(app=app)


def authenticate():
    c_k = "GEhtSyP9e98mzFeiOCSW0lvQX"
    c_s = "438cmYrl5xqaX2W7I2Bf5A9nF1pN5VtM9f77WYQnAXg1BwKJ27"
    a_t = "1380217745732689921-8gCfr8Zx9YHKvo4OVP3HAr3kfMRkgz"
    a_t_s = "jGOlgTs1i1itGMxDxAqFEDnv7QAui772n9hGxeSIKcwzS"

    auth = tw.OAuthHandler(c_k, c_s)
    auth.set_access_token(a_t, a_t_s)
    api = tw.API(auth, wait_on_rate_limit=True)
    # client = tw.Client(b_t, c_k, c_s, a_t, a_t_s, wait_on_rate_limit=True);
    return api


def search_repo_conditions(repository_id):
    api = authenticate()
    geocode = "44.3591600,11.7132000,20km"

    repo = Repository.query.filter_by(id=repository_id).first()
    if repo is None:
        print("Non esiste una repository con questo id")
        return False
    conditions = [use for use in repo.conditions]
    evaluation_mode = repo.evaluation_mode
    conditions_type = dict()
    # Dividing condition into condition types
    for condition in conditions:
        # print(condition.id)
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
    if ConditionType.hashtag in conditions_type.keys():
        for condition_content in conditions_type[ConditionType.hashtag]:
            queryString += ("#" + condition_content.content + " " + queryConjunction + " ")
    if ConditionType.coordinates in conditions_type.keys():
        if evaluation_mode == ConditionMode.all_and:
            if len(conditions_type[ConditionType.coordinates]) == 1:
                coordinates_tweet = conditions_type[ConditionType.coordinates][0].split()
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
                        tweetDB = Tweet(snowflake=tweet.id, content=tweet.text,
                                       location=tweet.geo['coordinates'] if tweet.geo is not None else None,
                                       place=tweet.place.full_name if tweet.place is not None else None,
                                       insert_time=str(datetime.now()),
                                       poster=tweet.author.screen_name)
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
    if ConditionType.user in conditions_type.keys():
        for condition_content in conditions_type[ConditionType.user]:
            queryString += ("from:" + condition_content.content + " " + queryConjunction + " ")
    if ConditionType.time in conditions_type.keys():
        for condition_content in conditions_type[ConditionType.time]:
            if condition_content.content[0] == '<':
                queryString += ("until:" + condition_content.content[2:] + " " + queryConjunction + " ")
            elif condition_content.content[0] == '>':
                queryString += ("since:" + condition_content.content[2:] + " " + queryConjunction + " ")
    queryString = queryString[:-len(queryConjunction) - 1]
    print(queryString)
    if evaluation_mode == ConditionMode.all_or:
        if queryString != "":
            for tweet in tw.Cursor(method=api.search, q=queryString).items(10):
                tweetsFound.append(tweet)
                print(tweet.user.name + ' : ' + tweet.text + ' : ' + tweet.geo)
    elif evaluation_mode == ConditionMode.all_and:
        for tweet in tw.Cursor(method=api.search, q=queryString, geocode=coordinates_string).items(10):
            tweetsFound.append(tweet)
            print(tweet.user.name + ' : ' + tweet.text + ' : ' + str(tweet.geo))
    for tweet in tweetsFound:
        if not Tweet.query.filter_by(snowflake=str(tweet.id)).all():
            tweetDB = Tweet(snowflake=tweet.id, content=tweet.text,
                            location=tweet.geo['coordinates'] if tweet.geo is not None else None,
                            place=tweet.place.full_name if tweet.place is not None else None,
                            insert_time=str(datetime.now()),
                            poster=tweet.author.screen_name)
            ext.session.add(tweetDB)
            ext.session.commit()
        if evaluation_mode == ConditionMode.all_or:
            if ConditionType.hashtag in conditions_type.keys():
                for condition_content in conditions_type[ConditionType.hashtag]:
                    if condition_content.content in [hashtag['text'] for hashtag in tweet.entities['hashtags']]:
                        condition_associated = Contains(cid=condition_content.id, snowflake=tweet.id)
                        ext.session.add(condition_associated)
                        ext.session.commit()
            if ConditionType.user in conditions_type.keys():
                for condition_content in conditions_type[ConditionType.user]:
                    if condition_content.content == tweet.author.screen_name:
                        condition_associated = Contains(cid=condition_content.id, snowflake=tweet.id)
                        ext.session.add(condition_associated)
                        ext.session.commit()

            if ConditionType.time in conditions_type.keys():
                for condition_content in conditions_type[ConditionType.time]:
                    condition_date_time = datetime.fromisoformat(condition_content.content[2:])
                    if condition_content.content[0] == '<':
                        if tweet.created_at < condition_date_time:
                            condition_associated = Contains(cid=condition_content.id, snowflake=tweet.id)
                            ext.session.add(condition_associated)
                            ext.session.commit()
                    elif condition_content.content[0] == '>':
                        if tweet.created_at > condition_date_time:
                            condition_associated = Contains(cid=condition_content.id, snowflake=tweet.id)
                            ext.session.add(condition_associated)
                            ext.session.commit()
        elif evaluation_mode == ConditionMode.all_and:
            for condition in conditions:
                if Contains.query.filter_by(snowflake=str(tweet.id), cid=condition.id).all():
                    condition_associated = Contains(cid=condition.id, snowflake=tweet.id)
                    ext.session.add(condition_associated)
                    ext.session.commit()
        if not Composed.query.filter_by(snowflake=str(tweet.id), rid=repository_id).all():
            composed = Composed(rid=repository_id, snowflake=tweet.id)
            ext.session.add(composed)
            ext.session.commit()

if __name__ == "__main__":
    search_repo_conditions(16)
    with app.app_context():
        ext.create_all(app=app)
