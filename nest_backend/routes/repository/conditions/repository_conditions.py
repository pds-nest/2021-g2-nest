from flask import request
from flask_jwt_extended import jwt_required
from nest_backend.gestione import repository_auth, json_error, json_success, ConditionType, Condition, Repository, \
    find_user, get_jwt_identity
from nest_backend.database import ext
from flask_cors import cross_origin
from nest_backend.gestione import hashtag_validator
from nest_backend.errors import *


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
        parameters:
        - in: path
          schema: IntegerParameterSchema
        requestBody:
            required: true
            content:
                application/json:
                    schema: CreateCondition
        responses:
            '201':
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

    repository = Repository.query.filter_by(id=rid, is_deleted=False).first()
    if not repository:
        return json_error("Could not find repository", REPOSITORY_NOT_FOUND), 404
    user = find_user(get_jwt_identity())

    if request.method == "GET":
        try:
            return json_success([u.to_json() for u in repository.conditions])
        except Exception as e:
            return json_error("Unknown error:" + str(e), GENERIC_UFO), 400

    if user.email != repository.owner_id:
        return json_error("You are not authorized.", REPOSITORY_NOT_OWNER), 403

    if request.method == "POST":
        if request.json is None:
            return json_error("Missing json content.", GENERIC_NO_JSON), 400

        if (type_ := request.json.get("type")) is None:
            return json_error("Missing `type` parameter.", GENERIC_MISSING_FIELDS), 400

        try:
            type_ = ConditionType(type_)
        except KeyError:
            return json_error("Unknown `type` specified.", GENERIC_ENUM_INVALID), 400
        except Exception as e:
            return json_error("Unknown error: " + str(e)), 400

        if not (content := request.json.get("content")):
            return json_error("Missing `content` parameter.", GENERIC_MISSING_FIELDS), 400
        if type_ == ConditionType.hashtag:
            content = hashtag_validator(content)
        condition = Condition(content=content, type=type_, repository_id=rid)
        ext.session.add(condition)
        ext.session.commit()

        return json_success(condition.to_json()), 201
