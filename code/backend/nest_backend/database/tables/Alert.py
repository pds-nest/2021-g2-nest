"""
This module defines the Alert database class.
"""

from ..base import Base


class Alert(Base.Model):
    __tablename__ = "alert"
    id = Base.Column(Base.Integer, primary_key=True)
    name = Base.Column(Base.String, nullable=False)
    limit = Base.Column(Base.Integer, nullable=False)
    window_size = Base.Column(Base.Integer, nullable=False)
    # Foreign Keys
    repository_id = Base.Column(Base.Integer, Base.ForeignKey("repository.id", ondelete="CASCADE"), nullable=False)
    # Relationships
    repository = Base.relationship("Repository", back_populates="alerts")
    notifications = Base.relationship("Notification", back_populates="alert", cascade="all, delete")
    operations = Base.relationship("BoolOperation", back_populates="alert", cascade="all, delete")

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
