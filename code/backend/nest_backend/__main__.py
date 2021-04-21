"""
This is the runner for the server.
"""
from flask import Flask
import os
import werkzeug.middleware.proxy_fix
from .routes import *
from database import Base, tables
import psycopg2


app = Flask(__name__)
if os.getenv('COOKIE_SECRET'):
    app.secret_key = os.getenv('COOKIE_SECRET')
else:
    app.secret_key = "testing"
reverse_proxy_app = werkzeug.middleware.proxy_fix.ProxyFix(app=app, x_for=1, x_proto=0, x_host=1, x_port=0, x_prefix=0)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@localhost:5432/PdSDev'
Base.app = app
Base.init_app(app)
# Routes setup
app.add_url_rule("/doa", view_func=page_doa, methods=["GET"])

if __name__ == "__main__":
    Base.create_all()
    app.run(debug=True)
