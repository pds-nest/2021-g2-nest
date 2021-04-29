from flask import render_template, abort, jsonify, request
from ...database import *
from flask_jwt_extended import jwt_required
from ...gestione import *
from flask_cors import cross_origin
import datetime


@cross_origin()
@jwt_required()
@repository_auth
def page_repository(rid):
    """
    Repository <rid>:
        + GET: Gets info about the specified repository.
        + PATCH: [name], [close], [open] -> Updates certain aspects of the repository.
        + DELETE: deletes the specified repository.
    """
    user = find_user(get_jwt_identity())
    repository = Repository.query.filter_by(id=rid).first()
    if request.method == "GET":
        return json_success(repository.to_json()), 200
    elif request.method == "PATCH":
        if repository.owner_id != user.email:
            return json_error("You are not the owner of this repository."), 403
        if 'name' in request.json:
            repository.name = request.json['name']
        if 'close' in request.json and not repository.end and repository.isActive:
            repository.end = datetime.datetime.now()
            repository.isActive = False
        if 'open' in request.json and not repository.isActive and not repository.end:
            repository.isActive = True
        Base.session.commit()
        return json_success(repository.to_json()), 200
    elif request.method == "DELETE":
        if repository.owner_id != user.email:
            return json_error("You are not the owner of this repository."), 403
        Base.session.delete(repository)
        Base.session.commit()
        return json_success("Success"), 200