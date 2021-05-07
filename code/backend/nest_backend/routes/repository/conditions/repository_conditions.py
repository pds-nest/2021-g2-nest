from flask import render_template, abort, jsonify, request
from nest_backend.database import *
from flask_jwt_extended import jwt_required
from nest_backend.gestione import *
from flask_cors import cross_origin


@cross_origin()
@jwt_required()
@repository_auth
def page_repository_conditions(rid):
    """
    ---
    get:
        summary: Get a list of a repository conditions.
        parameters:
        - in: path
          schema: IntegerParameterSchema
        security:
        - jwt: []
        responses:
            '200':
                description: List of Condition schemas, incapsulated in Success.
            '401':
                description: The user is not logged in.
                content:
                    application/json:
                        schema: Error
            '403':
                description: The user is not authorized.
                content:
                    application/json:
                        schema: Error
            '404':
                description: The repository could not be found.
                content:
                    application/json:
                        schema: Error
        tags:
            - repository-related
    post:
        summary: Creates a condition and attaches it to the repository.
        security:
        - jwt: []
        requestBody:
            required: true
            content:
                application/json:
                    schema: CreateCondition
        responses:
            '200':
                description: The user has been created successfully.
                content:
                    application/json:
                        schema: Condition
            '403':
                description: The user is not authorized.
                content:
                    application/json:
                        schema: Error
            '401':
                description: The user is not logged in.
                content:
                    application/json:
                        schema: Error
        tags:
            - repository-related
    """

    repository = Repository.query.filter_by(id=rid).first()
    if not repository:
        return json_error("Could not find repository"), 404
    user = find_user(get_jwt_identity())

    if user.email != repository.owner_id:
        return json_error("You are not authorized."), 403

    if request.method == "GET":
        return json_success([u.condition.to_json() for u in repository.conditions])

    if request.method == "POST":
        if (type_ := request.json.get("type")) is None:
            return json_error("Missing `type` parameter."), 400

        try:
            type_ = ConditionType(type_)
        except KeyError:
            return json_error("Unknown `type` specified."), 400

        if not (content := request.json.get("content")):
            return json_error("Missing `content` parameter."), 400

        condition = Condition(content=content, type=type_, repository_id=rid)
        Base.session.add(condition)
        Base.session.commit()

        return json_success(condition.to_json()), 200