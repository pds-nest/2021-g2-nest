"""
This module creates the declarative base
"""
import flask_sqlalchemy
from sqlalchemy.orm import backref

Base = flask_sqlalchemy.SQLAlchemy()
