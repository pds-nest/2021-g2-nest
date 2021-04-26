from flask import render_template, abort, jsonify, request
from ...database import *
from flask_jwt_extended import jwt_required
from ...gestione import *
from flask_cors import cross_origin
import datetime


@cross_origin()
@jwt_required()
@repository_auth
def page_repository_edit():
    """
    This API call allows to edit a repository.
    :parameter name: If present, it changes the repository name.
    :parameter close: If present, it closes the repository.
    :returns: A JSON formatted string that either contains an error or the updated representation of the repository.
    """
    repository = Repository.query.filter_by(id=request.json['id'])
    if 'name' in request.json:
        repository.name = request.json['name']
    if 'close' in request.json and not repository.end and repository.isActive:
        repository.end = datetime.datetime.now()
        repository.isActive = False
    if 'open' in request.json and not repository.isActive and not repository.end:
        repository.isActive = True
    Base.session.commit()
    return json_success(repository.to_json())