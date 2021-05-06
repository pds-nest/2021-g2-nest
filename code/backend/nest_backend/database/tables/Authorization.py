"""
This module defines the Authorization database class.
"""

from ..base import Base


class Authorization(Base.Model):
    rid = Base.Column(Base.Integer, Base.ForeignKey("repository.id", ondelete="CASCADE"), primary_key=True)
    email = Base.Column(Base.String, Base.ForeignKey("user.email", ondelete="CASCADE"), primary_key=True)
    # Relationships
    repository = Base.relationship("Repository", back_populates="authorizations")
    user = Base.relationship("User", back_populates="authorizations")