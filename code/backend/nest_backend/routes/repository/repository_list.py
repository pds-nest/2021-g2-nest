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
    :returns: a JSON-formatted string that contains under the "content" field the list of repositories that belong to
    the user ("owner") and a list of repositories that he can spectate ("spectator").
    """
    user = find_user(get_jwt_identity())
    return json_success({"owner": [r.to_json() for r in user.owner_of],
                         "spectator": [r.repository.to_json() for r in user.authorizations]})
