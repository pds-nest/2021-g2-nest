"""
This module defines the Tweet database class.
"""

from ..base import ext


class Tweet(ext.Model):
    __tablename__ = "tweet"
    snowflake = ext.Column(ext.String, primary_key=True)
    content = ext.Column(ext.String)
    location = ext.Column(ext.String)
    place = ext.Column(ext.String)
    poster = ext.Column(ext.String)
    insert_time = ext.Column(ext.DateTime, nullable=False)
    post_time = ext.Column(ext.DateTime, nullable=True)
    image_url = ext.Column(ext.String, nullable=True)
    # Relationships
    repositories = ext.relationship("Composed", back_populates="tweet", cascade="all, delete")
    conditions = ext.relationship("Contains", back_populates="tweet", cascade="all, delete")

    def to_json(self):
        return {"snowflake": self.snowflake, "content": self.content, "location": self.location, "poster": self.poster,
                "place": self.place, "insert_time": self.insert_time.isoformat(), "post_time": self.post_time,
                "image_url": self.image_url, "conditions": [c.condition.to_json() for c in self.conditions]}
