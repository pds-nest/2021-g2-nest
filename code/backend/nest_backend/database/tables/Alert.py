"""
This module defines the Alert database class.
"""

from ..base import ext


class Alert(ext.Model):
    __tablename__ = "alert"
    id = ext.Column(ext.Integer, primary_key=True)
    name = ext.Column(ext.String, nullable=False)
    limit = ext.Column(ext.Integer, nullable=False)
    window_size = ext.Column(ext.Integer, nullable=False)
    # Foreign Keys
    repository_id = ext.Column(ext.Integer, ext.ForeignKey("repository.id", ondelete="CASCADE"), nullable=False)
    # Relationships
    repository = ext.relationship("Repository", back_populates="alerts")
    notifications = ext.relationship("Notification", back_populates="alert")
    operations = ext.relationship("BoolOperation", back_populates="alert")

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'window_size': self.window_size,
            'limit': self.limit,
            'repository_id': self.repository_id,
            'notifications': [notification.to_json() for notification in self.notifications],
            'operations': [operation.to_json() for operation in self.operations],
            'root_operation': [operation.to_json() for operation in self.operations if operation.is_root == True][
                0] if self.operations else None
        }
