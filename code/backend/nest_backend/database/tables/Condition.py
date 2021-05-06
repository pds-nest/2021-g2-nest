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
    # FK
    repository_id = Base.Column(Base.Integer, Base.ForeignKey("repository.id", ondelete="CASCADE"))
    # Relationships
    repository = Base.relationship("Repository", back_populates="conditions", cascade="all, delete")
    tweets = Base.relationship("Contains", back_populates="condition")
    operations = Base.relationship("BoolOperation", back_populates="condition")

    def to_json(self):
        return {
            "id": self.id,
            "type": self.type.value,
            "content": self.content,
        }
