"""
This module defines the Notification database class.
"""

from ..base import ext


class Notification(ext.Model):
    __tablename__ = "notification"
    id = ext.Column(ext.Integer, primary_key=True)
    ora = ext.Column(ext.DateTime, nullable=False)
    # Foreign Key
    alert_id = ext.Column(ext.Integer, ext.ForeignKey("alert.id"), nullable=False)
    # Relationships
    alert = ext.relationship("Alert", back_populates="notifications")

    def to_json(self):
        return {
            "id": self.id,
            "ora": self.ora.isoformat(),
            "alert_id": self.alert_id
        }
