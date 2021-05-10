"""
This module defines the :class:`.Repository` database class.
"""

from ..base import ext
from .Enums import ConditionMode


class Repository(ext.Model):
    __tablename__ = "repository"

    # Columns
    id = ext.Column(ext.Integer, primary_key=True)
    name = ext.Column(ext.String, nullable=False)
    start = ext.Column(ext.DateTime, nullable=True)
    end = ext.Column(ext.DateTime, nullable=True)
    is_active = ext.Column(ext.Boolean, nullable=False, default=False)
    evaluation_mode = ext.Column(ext.Enum(ConditionMode), default=ConditionMode.all_or)

    # Foreign Keys
    owner_id = ext.Column(ext.String, ext.ForeignKey("user.email", ondelete="CASCADE"), nullable=False)

    # Relationships
    owner = ext.relationship("User", back_populates="owner_of")
    authorizations = ext.relationship("Authorization", back_populates="repository", cascade="all, delete")
    tweets = ext.relationship("Composed", back_populates="repository", cascade="all, delete")
    alerts = ext.relationship("Alert", back_populates="repository", cascade="all, delete")
    conditions = ext.relationship("Condition", back_populates="repository")

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "start": self.start.isoformat() if self.start else None,
            "is_active": self.is_active,
            "end": self.end.isoformat() if self.end else None,
            "owner": self.owner.to_json(),
            "evaluation_mode": self.evaluation_mode.value,
            "conditions": [c.to_json() for c in self.conditions]
        }
