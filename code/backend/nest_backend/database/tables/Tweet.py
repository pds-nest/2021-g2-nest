"""
This module defines the Tweet database class.
"""

from ..base import Base


class Tweet(Base.Model):
    __tablename__ = "tweet"
    snowflake = Base.Column(Base.String, primary_key=True)
    content = Base.Column(Base.String)
    location = Base.Column(Base.String)  # Todo: see if a dedicated class for locations is needed. This is likely.
    poster = Base.Column(Base.String)  # Todo: see if a dedicated class for posters is needed.
    # Relationships
    repositories = Base.relationship("Composed", back_populates="tweet")
    conditions = Base.relationship("Contains", back_populates="tweet")