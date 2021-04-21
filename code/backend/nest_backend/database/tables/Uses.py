"""
This module defines the Uses database class.
"""

from ..base import Base


class Uses(Base.Model):
    __tablename__ = "uses"
    rid = Base.Column(Base.Integer, Base.ForeignKey("repository.id"), primary_key=True)
    cid = Base.Column(Base.Integer, Base.ForeignKey("condition.id"), primary_key=True)
    # Relationships
    repository = Base.relationship("Repository", back_populates="uses")
    condition = Base.relationship("Condition", back_populates="used")