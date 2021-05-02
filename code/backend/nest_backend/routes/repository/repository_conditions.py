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
    if not repository:
        return json_error("Could not find repository"), 404
    user = find_user(get_jwt_identity())

    if user.email != repository.owner_id:
        return json_error("You are not authorized."), 403

    if request.method == "GET":
        return json_success([u.condition.to_json() for u in repository.uses])

    if request.method == "POST":
        if (type_ := request.json.get("type")) is None:
            return json_error("Missing `type` parameter."), 400

        try:
            type_ = ConditionType(type_)
        except KeyError:
            return json_error("Unknown `type` specified."), 400

        if not (content := request.json.get("content")):
            return json_error("Missing `content` parameter."), 400

        if (repo_id := request.json.get("id")) is None:
            return json_error("Missing `id` parameter."), 400

        condition = Condition(content=content, type=type_)
        Base.session.merge(condition)

        repository = Repository.query.get(repo_id)
        use = Uses(cid=condition.id, rid=repository.id)
        Base.session.merge(use)

        Base.session.commit()
        return json_success(condition.to_json()), 200
