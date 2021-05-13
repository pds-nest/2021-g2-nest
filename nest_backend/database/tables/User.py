"""
This module defines the User database class.
"""

from ..base import ext


class User(ext.Model):
    __tablename__ = "user"
    email = ext.Column(ext.String, primary_key=True)
    username = ext.Column(ext.String, nullable=False)
    password = ext.Column(ext.LargeBinary, nullable=False)
    isAdmin = ext.Column(ext.Boolean, default=False)
    # Relationships
    owner_of = ext.relationship("Repository", back_populates="owner", cascade="all, delete")
    authorizations = ext.relationship("Authorization", back_populates="user", cascade="all, delete")

    def to_json(self):
        return {'email': self.email, 'username': self.username, 'isAdmin': self.isAdmin}
