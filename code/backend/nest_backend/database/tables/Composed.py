"""
This module defines the Composed database class.
"""

from ..base import Base


class Composed(Base.Model):
    __tablename__ = "composed"
    rid = Base.Column(Base.Integer, Base.ForeignKey("repository.id"), primary_key=True)
    snowflake = Base.Column(Base.String, Base.ForeignKey("tweet.snowflake"), primary_key=True)
    # Relationships
    repository = Base.relationship("Repository", back_populates="tweets")
    tweet = Base.relationship("Tweet", back_populates="repositories")