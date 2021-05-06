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
from api_spec import spec
from swagger import swagger_ui_blueprint, SWAGGER_URL

Base.init_app(app=app)
jwt = JWTManager(app)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

reverse_proxy_app = werkzeug.middleware.proxy_fix.ProxyFix(app=app, x_for=1, x_proto=0, x_host=1, x_port=0, x_prefix=0)
# Routes setup

app.add_url_rule("/doa", view_func=page_doa, methods=["GET", "POST"])
app.add_url_rule("/api/v1/login", view_func=page_login, methods=["POST"])
app.add_url_rule("/api/v1/users", view_func=page_users, methods=["GET", "POST"])
app.add_url_rule("/api/v1/users/<string:email>", view_func=page_user, methods=["GET", "PATCH", "DELETE"])
app.add_url_rule("/api/v1/repositories/", view_func=page_repositories, methods=["GET", "POST"])
app.add_url_rule("/api/v1/repositories/<int:rid>", view_func=page_repository, methods=["GET", "PATCH", "DELETE"])
app.add_url_rule("/api/v1/repositories/<int:rid>/conditions", view_func=page_repository_conditions,
                 methods=["GET", "POST"])

app.register_error_handler(Exception, error_handler)
app.register_blueprint(swagger_ui_blueprint, url_prefix=SWAGGER_URL)


with app.test_request_context():
    for fn_name in app.view_functions:
        if fn_name == 'static':
            continue
        view_fn = app.view_functions[fn_name]
        spec.path(view=view_fn)


@app.route("/docs/swagger.json")
def create_swagger_doc():
    return jsonify(spec.to_dict())


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
