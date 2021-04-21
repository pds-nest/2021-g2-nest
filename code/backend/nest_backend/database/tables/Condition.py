"""
This module defines the Condition database class.
"""

from ..base import Base
from .Enums import ConditionType


class Condition(Base.Model):
    __tablename__ = "condition"
    id = Base.Column(Base.Integer, primary_key=True)
    type = Base.Column(Base.Enum(ConditionType), nullable=False)
    content = Base.Column(Base.String, nullable=False)
    # Relationships
    used = Base.relationship("Uses", back_populates="condition")
    tweets = Base.relationship("Contains", back_populates="condition")
    operations = Base.relationship("BoolOperation", back_populates="condition")
