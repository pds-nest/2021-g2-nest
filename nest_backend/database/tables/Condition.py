"""
This module defines the Condition database class.
"""

from ..base import ext
from .Enums import ConditionType


class Condition(ext.Model):
    __tablename__ = "condition"
    id = ext.Column(ext.Integer, primary_key=True)
    type = ext.Column(ext.Enum(ConditionType), nullable=False, default=ConditionType.hashtag)
    content = ext.Column(ext.String, nullable=False)
    # FK
    repository_id = ext.Column(ext.Integer, ext.ForeignKey("repository.id", ondelete="CASCADE"))
    # Relationships
    repository = ext.relationship("Repository", back_populates="conditions")
    tweets = ext.relationship("Contains", back_populates="condition")
    alerts = ext.relationship("MadeOf", back_populates="condition")

    def to_json(self):
        return {
            "id": self.id,
            "type": self.type.value,
            "content": self.content,
        }
