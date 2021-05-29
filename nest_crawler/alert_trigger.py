from datetime import datetime, timedelta
from nest_backend.database import *
from authentication import authenticate
import smtplib
import tweepy as tw

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
            #send_notification_email(alert)
            send_notification_tweet(alert)


def send_notification_email(alert):
    owner_repo = alert.repository.owner
    conditions_string = ''
    for condition in alert.conditions:
        conditions_string += condition.condition.content + ','
    conditions_string = conditions_string[:-1]
    smtpObj = None
    try:
        with smtplib.SMTP(host='localhost') as smtpObj:
            smtpObj.sendmail("alert@nest.com", owner_repo.email, "Alert triggered")
            print("Successfully sent email")
    except smtplib.SMTPException:
        print("Error: unable to send email")

def send_notification_tweet(alert):
    api = authenticate()
    conditions_string = ''
    for condition in alert.conditions:
        conditions_string += condition.condition.content + ','
    conditions_string = conditions_string[:-1]
    print(conditions_string)
    try:
        api.update_status(f"L'alert {alert.name} è stato attivato! C'è stato un incremento di popolarità negli argomenti di ricerca {conditions_string}")
    except tw.errors.Forbidden:
        print("Il tweet e' gia' stato pubblicato")

