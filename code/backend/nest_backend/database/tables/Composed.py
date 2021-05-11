"""
This module defines the Composed database class.
"""

from ..base import ext


class Composed(ext.Model):
    __tablename__ = "composed"
    rid = ext.Column(ext.Integer, ext.ForeignKey("repository.id", ondelete="CASCADE"), primary_key=True)
    snowflake = ext.Column(ext.String, ext.ForeignKey("tweet.snowflake"), primary_key=True)
    # Relationships
    repository = ext.relationship("Repository", back_populates="tweets")
    tweet = ext.relationship("Tweet", back_populates="repositories")