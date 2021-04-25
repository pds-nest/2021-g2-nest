"""
This is the runner for the server.
"""
from flask import Flask
import os
import werkzeug.middleware.proxy_fix
from .routes import *
from .database import Base, tables
import psycopg2
from .gestione import *
from flask_cors import CORS
from flask_jwt_extended import *

app = Flask(__name__)
if os.getenv('COOKIE_SECRET'):
    app.secret_key = os.getenv('COOKIE_SECRET')
else:
    app.secret_key = "testing"
if os.getenv("JWT_SECRET_KEY"):
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
else:
    app.config["JWT_SECRET_KEY"] = "testing"

reverse_proxy_app = werkzeug.middleware.proxy_fix.ProxyFix(app=app, x_for=1, x_proto=0, x_host=1, x_port=0, x_prefix=0)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@localhost:5432/PdSDev'
Base.app = app
Base.init_app(app)
jwt = JWTManager(app)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
# Routes setup

app.add_url_rule("/doa", view_func=page_doa, methods=["GET", "POST"])
app.add_url_rule("/api/login", view_func=page_login, methods=["POST"])
app.add_url_rule("/api/user/create", view_func=page_user_create, methods=["POST"])

if __name__ == "__main__":
    Base.create_all()
    if not User.query.filter_by(isAdmin=True).all():
        Base.session.add(User(email="admin@admin.com", password=gen_password("password"), username="admin", isAdmin=True))
        Base.session.commit()
    app.run(debug=True)
