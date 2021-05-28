from datetime import datetime
from math import cos, radians

from nest_backend.database import *


def associate_condition_tweet(conditions_type, tweet):
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
    if ConditionType.coordinates in conditions_type.keys():
        for condition_content in conditions_type[ConditionType.coordinates]:
            coordinates = condition_content.content.split()
            if tweet.geo is not None and is_coordinate_inside_bounding_box(float(coordinates[2]), float(coordinates[3]), float(coordinates[1])/1000, tweet.geo['coordinates'][0], tweet.geo['coordinates'][1]):
                if not Contains.query.filter_by(snowflake=str(tweet.id), cid=condition_content.id).all():
                    condition_associated = Contains(cid=condition_content.id, snowflake=tweet.id)
                    ext.session.add(condition_associated)
                    ext.session.commit()


def is_coordinate_inside_bounding_box(latitude, longitude, radius, tweet_latitude, tweet_longitude):
    earth_radius_km = 6371
    dLatitude = 360 * radius / earth_radius_km
    dLongitude = dLatitude * cos(radians(latitude))
    if (latitude - dLatitude < tweet_latitude < latitude+dLatitude) and (longitude-dLongitude < tweet_longitude < longitude+dLongitude):
        return True
