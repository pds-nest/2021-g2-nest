from flask import render_template, abort, jsonify, request
from ...database import *
from flask_jwt_extended import jwt_required
from ...gestione import *
from flask_cors import cross_origin


@cross_origin()
@jwt_required()
def page_repository_list():
    """
    API call that returns the list of repositories.
    :parameter onlyActive: if present, only active repos are provided
    :parameter onlyDead: if present, only dead repos are provided
    :returns: a JSON-formatted string that contains under the "content" field the list of repositories that belong to
    the user ("owner") and a list of repositories that he can spectate ("spectator").
    """
    user = find_user(get_jwt_identity())
    owner = Repository.query.filter_by(owner_id=user.email)
    spectator = Authorization.query.filter_by(email=user.email).join(Repository)
    if request.json.get("onlyActive"):
        owner = owner.filter_by(isActive=True)
        spectator = spectator.filter(Repository.isActive == True)
    elif request.json.get("onlyDead"):
        owner = owner.filter_by(isActive=False)
        spectator = spectator.filter(Repository.isActive == False)
    owner = owner.all()
    spectator = spectator.all()
    return json_success({"owner": [r.to_json() for r in owner],
                         "spectator": [r.repository.to_json() for r in spectator]})
