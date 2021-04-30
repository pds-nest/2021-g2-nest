from flask import render_template, abort, jsonify, request
from ...database import *
from flask_jwt_extended import jwt_required
from ...gestione import *
import datetime
from flask_cors import cross_origin


@cross_origin()
@jwt_required()
def page_repositories():
    """
    Repositories:
        + GET: [onlyActive], [onlyDead] -> Gets the list of all the user-related repos.
        + POST: name -> Creates a new repository and returns it
    """
    user = find_user(get_jwt_identity())
    if request.method == "GET":
        owner = Repository.query.filter_by(owner_id=user.email)
        spectator = Authorization.query.filter_by(email=user.email).join(Repository)
        if request.json.get("onlyActive"):
            owner = owner.filter_by(isActive=True)
            spectator = spectator.filter(Repository.isActive)
        elif request.json.get("onlyDead"):
            owner = owner.filter_by(isActive=False)
            spectator = spectator.filter(not Repository.isActive)
        owner = owner.all()
        spectator = spectator.all()
        return json_success({"owner": [r.to_json() for r in owner],
                            "spectator": [r.repository.to_json() for r in spectator]})
    elif request.method == "POST":
        name = request.json.get("name")
        if not name:
            return json_error("Missing one or more parameters"), 400
        repository = Repository(name=name, owner_id=user.email)
        Base.session.add(repository)
        Base.session.commit()
        return json_success(repository.to_json()), 200
