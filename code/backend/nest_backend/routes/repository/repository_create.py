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
    :returns: If the user is logged in and has provided the repository name, a JSON string is returned containing
    the return status of the operation and the repository in json format.
    """
    user = find_user(get_jwt_identity())
    name = request.json.get("name")
    if not name:
        return json_error("Missing one or more parameters"), 400
    repository = Repository(name=name, owner_id=user.email)
    Base.session.add(repository)
    Base.session.commit()
    return json_success(repository.to_json()), 200
