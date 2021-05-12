"""
This is the runner for the server.
"""
import os
import sys

from .gestione import *
from .app import app, extension_sqlalchemy
from .database import User


print(" * Swagger docs will be available at http://127.0.0.1:5000/docs")

with app.app_context():
    print(" * Creating database tables...")
    extension_sqlalchemy.create_all(app=app)
    if not User.query.filter_by(isAdmin=True).all():
        print(" * Creating default admin account...")
        extension_sqlalchemy.session.add(
            User(email="admin@admin.com", password=gen_password("password"), username="admin", isAdmin=True))
        extension_sqlalchemy.session.commit()
        print(" * Created! Username: admin | Password: password")

app.run(debug=__debug__)
