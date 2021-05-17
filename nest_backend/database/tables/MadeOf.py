"""
This module defines the MadeOf database class.
"""

from ..base import ext


class MadeOf(ext.Model):
    __tablename__ = "made_of"
    aid = ext.Column(ext.Integer, ext.ForeignKey("alert.id", ondelete="CASCADE"), primary_key=True)
    cid = ext.Column(ext.Integer, ext.ForeignKey("condition.id"), primary_key=True)
    # Relationships
    alert = ext.relationship("Alert", back_populates="conditions")
    condition = ext.relationship("Condition", back_populates="alerts")