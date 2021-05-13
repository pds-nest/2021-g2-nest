"""
This module defines the Authorization database class.
"""

from ..base import ext


class Authorization(ext.Model):
    rid = ext.Column(ext.Integer, ext.ForeignKey("repository.id", ondelete="CASCADE"), primary_key=True)
    email = ext.Column(ext.String, ext.ForeignKey("user.email", ondelete="CASCADE"), primary_key=True)
    # Relationships
    repository = ext.relationship("Repository", back_populates="authorizations")
    user = ext.relationship("User", back_populates="authorizations")