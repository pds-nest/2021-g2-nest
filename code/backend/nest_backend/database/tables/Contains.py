"""
This module defines the Contains database class.
"""

from ..base import ext


class Contains(ext.Model):
    __tablename__ = "contains"
    cid = ext.Column(ext.Integer, ext.ForeignKey("condition.id", ondelete="CASCADE"), primary_key=True)
    snowflake = ext.Column(ext.String, ext.ForeignKey("tweet.snowflake", ondelete="CASCADE"), primary_key=True)
    # Relationships
    condition = ext.relationship("Condition", back_populates="tweets")
    tweet = ext.relationship("Tweet", back_populates="conditions")