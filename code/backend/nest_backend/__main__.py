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
from .tweet_explorer.__main__ import search_repo_conditions, start_exploring

Base.init_app(app=app)

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

if __name__ == "__main__":
    with app.app_context():
        Base.create_all(app=app)
        if not User.query.filter_by(isAdmin=True).all():
            Base.session.add(User(email="admin@admin.com", password=gen_password("password"), username="admin", isAdmin=True))
            Base.session.commit()
        if not Repository.query.filter_by(id=1).first():
            Base.session.add(Repository(id=1, name="Draghi", owner_id="admin@admin.com"))
            Base.session.commit()
        if not Condition.query.filter_by(id=1).first():
            Base.session.add(Condition(id=1, type=Enums.ConditionType.hashtag, content="draghi"))
            Base.session.commit()
        if not Condition.query.filter_by(id=2).first():
            Base.session.add(Condition(id=2, type=Enums.ConditionType.location, content="Modena"))
            Base.session.commit()
        if not Condition.query.filter_by(id=3).first():
            Base.session.add(Condition(id=3, type=Enums.ConditionType.time, content="2021-04-27"))
            Base.session.commit()
        if not Uses.query.filter_by(rid=1, cid=1).first():
            Base.session.add(Uses(rid=1, cid=1))
            Base.session.commit()
        if not Uses.query.filter_by(rid=1, cid=2).first():
            Base.session.add(Uses(rid=1, cid=2))
            Base.session.commit()
        if not Uses.query.filter_by(rid=1, cid=3).first():
            Base.session.add(Uses(rid=1, cid=3))
            Base.session.commit()
        debug = True
        if os.getenv("DISABLE_DEBUG"):
            debug = False

        #print(Repository.query.all()[0].to_json())
        #print(Condition.query.all()[0].content)
        #print(Uses.query.all()[0].cid, Uses.query.all()[0].rid)
        search_repo_conditions(1)
        #start_exploring()
    app.run(debug=debug)

