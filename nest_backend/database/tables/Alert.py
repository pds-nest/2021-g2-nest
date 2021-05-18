"""
This module defines the Alert database class.
"""

from ..base import ext
from .Enums import ConditionMode


class Alert(ext.Model):
    __tablename__ = "alert"
    id = ext.Column(ext.Integer, primary_key=True)
    name = ext.Column(ext.String, nullable=False)
    limit = ext.Column(ext.Integer, nullable=False)
    window_size = ext.Column(ext.Integer, nullable=False)
    evaluation_mode = ext.Column(ext.Enum(ConditionMode), nullable=False, default=ConditionMode.all_or)
    # Foreign Keys
    repository_id = ext.Column(ext.Integer, ext.ForeignKey("repository.id", ondelete="CASCADE"), nullable=False)
    # Relationships
    repository = ext.relationship("Repository", back_populates="alerts")
    notifications = ext.relationship("Notification", back_populates="alert")
    conditions = ext.relationship("MadeOf", back_populates="alert")

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'window_size': self.window_size,
            'limit': self.limit,
            'repository_id': self.repository_id,
            'evaluation_mode': self.evaluation_mode.value,
            'notifications': [notification.to_json() for notification in self.notifications],
            'conditions': [c.condition.to_json() for c in self.conditions]
        }
