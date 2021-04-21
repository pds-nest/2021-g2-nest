"""
This module defines the Contains database class.
"""

from ..base import Base


class Contains(Base.Model):
    __tablename__ = "contains"
    cid = Base.Column(Base.Integer, Base.ForeignKey("condition.id"), primary_key=True)
    snowflake = Base.Column(Base.String, Base.ForeignKey("tweet.snowflake"), primary_key=True)
    # Relationships
    condition = Base.relationship("Condition", back_populates="tweets")
    tweet = Base.relationship("Tweet", back_populates="conditions")