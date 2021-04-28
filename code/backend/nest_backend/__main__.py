"""
This is the runner for the server.
"""
import os
import werkzeug.middleware.proxy_fix
from .routes import *
from .database import Base, tables
import psycopg2
from .gestione import *
from flask_cors import CORS
from flask_jwt_extended import *
from .app import app

Base.init_app(app=app)
jwt = JWTManager(app)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

reverse_proxy_app = werkzeug.middleware.proxy_fix.ProxyFix(app=app, x_for=1, x_proto=0, x_host=1, x_port=0, x_prefix=0)
# Routes setup

app.add_url_rule("/doa", view_func=page_doa, methods=["GET", "POST"])
app.add_url_rule("/api/login", view_func=page_login, methods=["POST"])
app.add_url_rule("/api/user/create", view_func=page_user_create, methods=["POST"])
app.add_url_rule("/api/user/remove", view_func=page_user_delete, methods=["POST"])
app.add_url_rule("/api/repository/list", view_func=page_repository_list, methods=["GET"])
app.add_url_rule("/api/repository/create", view_func=page_repository_create, methods=["POST"])
app.add_url_rule("/api/repository/edit", view_func=page_repository_edit, methods=["PUT"])
app.add_url_rule("/api/repository/add_condition", view_func=page_repository_add_condition, methods=["POST"])

app.register_error_handler(Exception, error_handler)

if __name__ == "__main__":
    with app.app_context():
        Base.create_all(app=app)
        if not User.query.filter_by(isAdmin=True).all():
            Base.session.add(
                User(email="admin@admin.com", password=gen_password("password"), username="admin", isAdmin=True))
            Base.session.commit()
        debug = True
        if os.getenv("DISABLE_DEBUG"):
            debug = False
    app.run(debug=debug)
