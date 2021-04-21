"""
This module defines the BoolOperation database class.
"""

from ..base import Base, backref
from .Enums import OperationType


class BoolOperation(Base.Model):
    __tablename__ = "bool_operation"
    id = Base.Column(Base.Integer, primary_key=True)
    operation = Base.Column(Base.Enum(OperationType), nullable=False)
    isRoot = Base.Column(Base.Boolean, default=False, nullable=False)
    # Foreign Keys
    condition_id = Base.Column(Base.Integer, Base.ForeignKey("condition.id"))
    node_1_id = Base.Column(Base.Integer, Base.ForeignKey("bool_operation.id"))
    node_2_id = Base.Column(Base.Integer, Base.ForeignKey("bool_operation.id"))
    alert_id = Base.Column(Base.Integer, Base.ForeignKey("alert.id"))
    # Relationships
    condition = Base.relationship("Condition", back_populates="operations")
    node_1 = Base.relationship("BoolOperation", primaryjoin=("bool_operation.c.node_1_id==bool_operation.c.id"),
                               remote_side="BoolOperation.id", backref=backref("father", uselist=False))
    node_2 = Base.relationship("BoolOperation", primaryjoin=("bool_operation.c.node_2_id==bool_operation.c.id"),
                               remote_side="BoolOperation.id", backref=backref("father", uselist=False))
    alert = Base.relationship("Alert", back_populates="operations")
