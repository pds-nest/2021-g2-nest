from flask import Flask
import os

app = Flask(__name__)
if os.getenv('COOKIE_SECRET'):
    app.secret_key = os.getenv('COOKIE_SECRET')
else:
    app.secret_key = "testing"
if os.getenv("JWT_SECRET_KEY"):
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
else:
    app.config["JWT_SECRET_KEY"] = "testing"
if os.getenv("DATABASE_URI"):
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@localhost:5432/PdSDev'
