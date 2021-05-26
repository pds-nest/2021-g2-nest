import random
from nest_backend.app import app
from nest_backend.database import *
import tweepy as tw
from datetime import datetime, timedelta
import smtplib

ext.init_app(app=app)


def authenticate():
    c_k = "GEhtSyP9e98mzFeiOCSW0lvQX"
    c_s = "438cmYrl5xqaX2W7I2Bf5A9nF1pN5VtM9f77WYQnAXg1BwKJ27"
    a_t = "1380217745732689921-IW3U1JlxhnQeGBUrnHZ2nxbxhksXUZ"
    a_t_s = "EUoYNoj72rb2q00tUIW8eTcLJAhUAYPstZlV78W9cPpEJ"

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
            if ConditionType.hashtag in conditions_type.keys():
                for condition_content in conditions_type[ConditionType.hashtag]:
                    if condition_content.content in [hashtag['text'] for hashtag in tweet.entities['hashtags']]:
                        if not Contains.query.filter_by(snowflake=str(tweet.id), cid=condition_content.id).all():
                            condition_associated = Contains(cid=condition_content.id, snowflake=tweet.id)
                            ext.session.add(condition_associated)
                            ext.session.commit()
            if ConditionType.user in conditions_type.keys():
                for condition_content in conditions_type[ConditionType.user]:
                    if condition_content.content == tweet.author.screen_name:
                        if not Contains.query.filter_by(snowflake=str(tweet.id), cid=condition_content.id).all():
                            condition_associated = Contains(cid=condition_content.id, snowflake=tweet.id)
                            ext.session.add(condition_associated)
                            ext.session.commit()

            if ConditionType.time in conditions_type.keys():
                for condition_content in conditions_type[ConditionType.time]:
                    condition_date_time = datetime.fromisoformat(condition_content.content[2:])
                    if condition_content.content[0] == '<':
                        if tweet.created_at < condition_date_time:
                            if not Contains.query.filter_by(snowflake=str(tweet.id), cid=condition_content.id).all():
                                condition_associated = Contains(cid=condition_content.id, snowflake=tweet.id)
                                ext.session.add(condition_associated)
                                ext.session.commit()
                    elif condition_content.content[0] == '>':
                        if tweet.created_at > condition_date_time:
                            if not Contains.query.filter_by(snowflake=str(tweet.id), cid=condition_content.id).all():
                                condition_associated = Contains(cid=condition_content.id, snowflake=tweet.id)
                                ext.session.add(condition_associated)
                                ext.session.commit()
        elif evaluation_mode == ConditionMode.all_and:
            for condition in conditions:
                if not Contains.query.filter_by(snowflake=str(tweet.id), cid=condition.id).all():
                    condition_associated = Contains(cid=condition.id, snowflake=tweet.id)
                    ext.session.add(condition_associated)
                    ext.session.commit()
        if not Composed.query.filter_by(snowflake=str(tweet.id), rid=repository_id).all():
            composed = Composed(rid=repository_id, snowflake=tweet.id)
            ext.session.add(composed)
            ext.session.commit()


def is_repo_alert_triggered(repository_id):
    repo = Repository.query.filter_by(id=repository_id).first()
    if repo is None:
        print("Non esiste una repository con questo id")
        return False
    alerts = [alert for alert in repo.alerts]
    alerts_triggered = []
    for alert in alerts:
        evaluation_mode = alert.evaluation_mode
        conditions = [condition.condition for condition in alert.conditions]
        repo_tweets = [tweet.tweet for tweet in repo.tweets]
        alert_tweets = set(repo_tweets)
        if evaluation_mode == ConditionMode.all_and:
            for condition in conditions:
                alert_tweets.intersection(set([tweet.tweet for tweet in condition.tweets]))
        elif evaluation_mode == ConditionMode.all_or:
            conditions_tweet = set()
            for condition in conditions:
                conditions_tweet.update([tweet.tweet for tweet in condition.tweets])
            alert_tweets = alert_tweets.intersection(conditions_tweet)
        end_time = datetime.now()
        window_size_hours = timedelta(hours = alert.window_size)
        last_notification_time = min([notification.ora for notification in alert.notifications] if len(alert.notifications)>0 else [end_time - window_size_hours])
        start_time = max(end_time - window_size_hours, last_notification_time)
        alert_tweets = [tweet for tweet in alert_tweets if (end_time > tweet.insert_time > start_time)]
        print(f"I tweet corrispondenti sono:{len(alert_tweets)}")
        if len(alert_tweets) >= alert.limit:
            alert_notification = Notification(ora=str(datetime.now()), alert_id=alert.id)
            ext.session.add(alert_notification)
            ext.session.commit()
            print("alert triggered")
            alerts_triggered.append(alert)
            send_notification_email(alert)
            send_notification_tweet(alert)


def send_notification_email(alert):
    owner_repo = alert.repository.owner
    conditions_string = ''
    for condition in alert.conditions:
        conditions_string += condition.condition.content + ','
    conditions_string = conditions_string[:-1]
    try:
        smtpObj = smtplib.SMTP('localhost')
        smtpObj.sendmail("alert@nest.com", owner_repo.email, "Alert triggered")
        print("Successfully sent email")
    except smtplib.SMTPException:
        print("Error: unable to send email")
    finally:
        if smtpObj is not None:
            smtpObj.close()

def send_notification_tweet(alert):
    api = authenticate()
    conditions_string = ''
    for condition in alert.conditions:
        conditions_string += condition.condition.content + ','
    conditions_string = conditions_string[:-1]
    print(conditions_string)
    api.update_status(f"L'alert {alert.name} è stato attivato! C'è stato un incremento di popolarità negli argomenti di ricerca {conditions_string}")
    

def send_test_tweet():
    api = authenticate()
    api.update_status("Test")

if __name__ == "__main__":
    search_repo_conditions(16)
    with app.app_context():
        ext.create_all(app=app)
