"""
This module defines the BoolOperation database class.
"""

from ..base import ext
from .Enums import OperationType
from sqlalchemy.orm import backref


class BoolOperation(ext.Model):
    __tablename__ = "bool_operation"
    id = ext.Column(ext.Integer, primary_key=True)
    operation = ext.Column(ext.Enum(OperationType), nullable=False)
    isRoot = ext.Column(ext.Boolean, default=False, nullable=False)
    # Foreign Keys
    condition_id = ext.Column(ext.Integer, ext.ForeignKey("condition.id"))
    node_1_id = ext.Column(ext.Integer, ext.ForeignKey("bool_operation.id"))
    node_2_id = ext.Column(ext.Integer, ext.ForeignKey("bool_operation.id"))
    alert_id = ext.Column(ext.Integer, ext.ForeignKey("alert.id"))
    # Relationships
    condition = ext.relationship("Condition", back_populates="operations")
    node_1 = ext.relationship("BoolOperation", primaryjoin=("bool_operation.c.node_1_id==bool_operation.c.id"),
                              remote_side="BoolOperation.id", backref=backref("father_1", uselist=False))
    node_2 = ext.relationship("BoolOperation", primaryjoin=("bool_operation.c.node_2_id==bool_operation.c.id"),
                              remote_side="BoolOperation.id", backref=backref("father_2", uselist=False))
    alert = ext.relationship("Alert", back_populates="operations")
