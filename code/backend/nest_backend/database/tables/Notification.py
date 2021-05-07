"""
This module defines the Notification database class.
"""

from ..base import Base

class Notification(Base.Model):
    __tablename__ = "notification"
    id = Base.Column(Base.Integer, primary_key=True)
    ora = Base.Column(Base.DateTime, nullable=False)
    # Foreign Key
    alert_id = Base.Column(Base.Integer, Base.ForeignKey("alert.id"), nullable=False)
    # Relationships
    alert = Base.relationship("Alert", back_populates="notifications")

    def to_json(self):
        return {
            "id": self.id,
            "ora": self.ora.isoformat(),
            "alert_id": self.alert_id
        }