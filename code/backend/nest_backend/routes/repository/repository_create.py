from flask import render_template, abort, jsonify, request
from ...database import *
from flask_jwt_extended import jwt_required
from ...gestione import *
import datetime
from flask_cors import cross_origin


@cross_origin()
@jwt_required()
def page_repository_create():
    """
    API call that allows an user to create a new repository.
    :form name: The name of the repository.
    :returns: If the user is logged in and
    """
    user = find_user(get_jwt_identity())
    name = request.json.get("name")
    if not name:
        return jsonify({"result": "failure", "msg": "Missing one or more parameters"}), 40
    repository = Repository(name=name, start=datetime.datetime.now(), owner_id=user.email)
    Base.session.add(repository)
    Base.session.commit()
    return jsonify({"result":"success", "content":repository.to_json()}), 200