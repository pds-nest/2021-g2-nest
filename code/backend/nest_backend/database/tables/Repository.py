"""
This module defines the :class:`.Repository` database class.
"""

from ..base import Base


class Repository(Base.Model):
    __tablename__ = "repository"

    # Columns
    id = Base.Column(Base.Integer, primary_key=True)
    name = Base.Column(Base.String, nullable=False)
    start = Base.Column(Base.DateTime, nullable=True)
    end = Base.Column(Base.DateTime, nullable=True)
    isActive = Base.Column(Base.Boolean, nullable=False, default=False)

    # Foreign Keys
    owner_id = Base.Column(Base.String, Base.ForeignKey("user.email"), nullable=False)

    # Relationships
    owner = Base.relationship("User", back_populates="owner_of")
    authorizations = Base.relationship("Authorization", back_populates="repository", cascade="all, delete")
    tweets = Base.relationship("Composed", back_populates="repository", cascade="all, delete")
    alerts = Base.relationship("Alert", back_populates="repository", cascade="all, delete")
    uses = Base.relationship("Uses", back_populates="repository", cascade="all, delete")

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "start": self.start.isoformat() if self.start else None,
            "isActive": self.isActive,
            "end": self.end.isoformat() if self.end else None,
            "owner": self.owner.to_json()
        }
