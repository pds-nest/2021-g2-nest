from flask import Flask
from flask_cors import CORS as FlaskCORS
from flask_jwt_extended import JWTManager as FlaskJWTManager
from werkzeug.middleware.proxy_fix import ProxyFix as MiddlewareProxyFix

from . import database, routes, gestione, swagger
from .api_spec import spec

# --- MAIN APP ---

app = Flask(__name__)

# --- APP CONFIG

app.config.from_envvar("FLASK_CONFIG")

# --- EXTENSIONS ---

app.config['CORS_HEADERS'] = 'Content-Type'
extension_cors = FlaskCORS(app=app)

extension_jwt = FlaskJWTManager(app=app)

extension_sqlalchemy = database.ext
extension_sqlalchemy.init_app(app=app)

# --- API ROUTES ---

app.add_url_rule(
    "/doa",
    view_func=routes.page_doa,
    methods=["GET", "POST"],
)
app.add_url_rule(
    "/api/v1/login",
    view_func=routes.page_login,
    methods=["POST"],
)
app.add_url_rule(
    "/api/v1/users/",
    view_func=routes.page_users,
    methods=["GET", "POST"],
)
app.add_url_rule(
    "/api/v1/users/<string:email>",
    view_func=routes.page_user,
    methods=["GET", "PATCH", "DELETE"],
)
app.add_url_rule(
    "/api/v1/repositories/",
    view_func=routes.page_repositories,
    methods=["GET", "POST"],
)
app.add_url_rule(
    "/api/v1/repositories/<int:rid>",
    view_func=routes.page_repository,
    methods=["GET", "PATCH", "DELETE", "PUT"],
)
app.add_url_rule(
    "/api/v1/repositories/<int:rid>/conditions",
    view_func=routes.page_repository_conditions,
    methods=["GET", "POST"],
)
app.add_url_rule(
    "/api/v1/repositories/<int:rid>/alerts",
    view_func=routes.page_repository_alerts,
    methods=["GET", "POST"]
)
app.add_url_rule(
    "/api/v1/repositories/<int:rid>/tweets",
    view_func=routes.page_repository_tweets,
    methods=["GET"]
)
app.add_url_rule(
    "/api/v1/alert/<int:aid>",
    view_func=routes.page_alert,
    methods=["GET", "PATCH", "DELETE", "PUT"]
)
app.add_url_rule(
    "/api/v1/conditions/<int:cid>",
    view_func=routes.page_condition,
    methods=["GET", "PATCH", "DELETE"],
)

# --- SWAGGER DOCS ---

app.register_blueprint(
    swagger.swagger_ui_blueprint,
    url_prefix=swagger.SWAGGER_URL
)

with app.test_request_context():
    for fn_name in app.view_functions:
        if fn_name == 'static':
            continue
        view_fn = app.view_functions[fn_name]
        spec.path(view=view_fn)

app.add_url_rule(
    "/docs/swagger.json",
    view_func=lambda: gestione.jsonify(spec.to_dict()),
    methods=["GET"],
)

# --- ERROR HANDLER ---

app.register_error_handler(
    Exception,
    gestione.error_handler
)

# --- REVERSE PROXY ---

rp_app = MiddlewareProxyFix(app=app, x_for=1, x_proto=0, x_host=1, x_port=0, x_prefix=0)
