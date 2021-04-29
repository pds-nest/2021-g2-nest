from flask import render_template, abort, jsonify, request
from ...database import *
from flask_jwt_extended import jwt_required
from ...gestione import *
from flask_cors import cross_origin


@cross_origin()
@jwt_required()
@repository_auth
def page_repository_conditions(rid):
    """
    Repository/Condition:
        + GET: Returns the conditions of the specified repo.
        + POST: type, content -> Adds a condition and returns it.
    """
    repository = Repository.query.filter_by(rid=rid).first()
    user = find_user(get_jwt_identity())
    if user.email != repository.owner_id:
        return json_error("You are not authorized."), 403
    if request.method == "GET":
        return json_success([u.condition.to_json() for u in repository.uses])
    if request.method == "POST":
        type = request.json.get("type")
        if not type or type not in dir(ConditionType):
            return json_error("Could not understand the type of the condition."), 400
        content = request.json.get("content")
        if not content:
            return json_error("Could not find the content"), 400
        condition = Condition.query.filter(Condition.content.ilike(str(content))).filter_by(type=ConditionType.__getattr__(str(type)).value).first()
        if not condition:
            condition = Condition(content=content, type=ConditionType.__getattr__(str(type)).value)
            Base.session.add(condition)
        repository = Repository.query.filter_by(request.json.get("id"))
        if Uses.query.filter_by(cid=condition.id, rid=repository.id):
            return json_error("This condition is already connected to the repository."), 406
        Base.session.add(Uses(cid=condition.id, rid=repository.id))
        Base.session.commit()
        return json_success(condition.to_json()), 200