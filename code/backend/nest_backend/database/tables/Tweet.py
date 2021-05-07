"""
This module defines the Tweet database class.
"""

from ..base import ext


class Tweet(ext.Model):
    __tablename__ = "tweet"
    snowflake = ext.Column(ext.String, primary_key=True)
    content = ext.Column(ext.String)
    location = ext.Column(ext.String)  # Todo: see if a dedicated class for locations is needed. This is likely.
    poster = ext.Column(ext.String)  # Todo: see if a dedicated class for posters is needed.
    # Relationships
    repositories = ext.relationship("Composed", back_populates="tweet", cascade="all, delete")
    conditions = ext.relationship("Contains", back_populates="tweet", cascade="all, delete")
