from flask import Flask
import os
import werkzeug.middleware.proxy_fix
from .routes import *
from .database import Base


app = Flask(__name__)
if os.getenv('COOKIE_SECRET'):
    app.secret_key = os.getenv('COOKIE_SECRET')
else:
    app.secret_key = "testing"
reverse_proxy_app = werkzeug.middleware.proxy_fix.ProxyFix(app=app, x_for=1, x_proto=0, x_host=1, x_port=0, x_prefix=0)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@localhost:5432/PdSDev'

# Routes setup
app.add_url_rule("/doa", view_func=page_doa, methods=["GET"])

if __name__ == "__main__":
    try:
        Base.create_all()
    except Exception:
        pass
    app.run(debug=True)
