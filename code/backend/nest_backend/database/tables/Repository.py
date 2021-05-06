"""
This module defines the :class:`.Repository` database class.
"""

from ..base import Base
from .Enums import ConditionMode


class Repository(Base.Model):
    __tablename__ = "repository"

    # Columns
    id = Base.Column(Base.Integer, primary_key=True)
    name = Base.Column(Base.String, nullable=False)
    start = Base.Column(Base.DateTime, nullable=True)
    end = Base.Column(Base.DateTime, nullable=True)
    is_active = Base.Column(Base.Boolean, nullable=False, default=False)
    evaluation_mode = Base.Column(Base.Enum(ConditionMode), default=ConditionMode.all_or.value)

    # Foreign Keys
    owner_id = Base.Column(Base.String, Base.ForeignKey("user.email", ondelete="CASCADE"), nullable=False)

    # Relationships
    owner = Base.relationship("User", back_populates="owner_of")
    authorizations = Base.relationship("Authorization", back_populates="repository", cascade="all, delete")
    tweets = Base.relationship("Composed", back_populates="repository", cascade="all, delete")
    alerts = Base.relationship("Alert", back_populates="repository", cascade="all, delete")
    conditions = Base.relationship("Condition", back_populates="repository")

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "start": self.start.isoformat() if self.start else None,
            "is_active": self.is_active,
            "end": self.end.isoformat() if self.end else None,
            "owner": self.owner.to_json(),
            "evaluation_mode": self.evaluation_mode,
            "conditions": [c.to_json() for c in self.conditions]
        }
