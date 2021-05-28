from flask import request
from flask_jwt_extended import jwt_required
from nest_backend.gestione import repository_auth, json_error, json_success, find_user, get_jwt_identity
from nest_backend.database import ext, User, Authorization, Repository
from flask_cors import cross_origin
from nest_backend.gestione import hashtag_validator
from nest_backend.errors import *


@cross_origin()
@jwt_required()
@repository_auth
def page_repository_authorizations(rid):
    """
    ---
    get:
        summary: Get a list of a repository authorizations.
        parameters:
        - in: path
          schema: IntegerParameterSchema
        security:
        - jwt: []
        responses:
            '200':
                description: List of Authorization schemas, incapsulated in Success.
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
        summary: Creates an authorization.
        security:
        - jwt: []
        parameters:
        - in: path
          schema: IntegerParameterSchema
        requestBody:
            required: true
            content:
                application/json:
                    schema: CreateAuthorization
        responses:
            '201':
                description: The authorization has been created successfully.
                content:
                    application/json:
                        schema: Authorization
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
    put:
        summary: Update an authorization.
        parameters:
        - in: path
          schema: IntegerParameterSchema
        security:
        - jwt: []
        requestBody:
            required: true
            content:
                application/json:
                    schema: CreateAuthorization
        responses:
            '200':
                description: The authorization already existed
                content:
                    application/json:
                        schema: Authorization
            '201':
                description: The authorization has been created successfully.
                content:
                    application/json:
                        schema: Authorization
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
                description: Something could not be found.
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
    if user.email != repository.owner_id:
        return json_error("You are not authorized.", REPOSITORY_NOT_OWNER), 403
    if request.method == "GET":
        try:
            return json_success([a.to_json() for a in repository.authorizations])
        except Exception as e:
            return json_error("Unknown error:" + str(e), GENERIC_UFO), 400
    if request.json is None:
        return json_error("Missing json content.", GENERIC_NO_JSON), 400
    if not request.json.get("email"):
        return json_error("Missing user email.", GENERIC_MISSING_FIELDS), 400
    target = User.query.filter_by(email=request.json.get('email')).first()
    if not target:
        return json_error("User could not be located", USER_NOT_FOUND), 400
    if target == user:
        return json_error("Owner cannot be a spectator", GENERIC_ALREADY_EXISTS), 406
    if request.method == "POST":
        authorization = Authorization(email=request.json.get('email'), rid=repository.id)
        ext.session.add(authorization)
        ext.session.commit()

        return json_success(authorization.to_json()), 201

    if request.method == "PUT":
        authorization = Authorization.query.filter_by(rid=rid, email=request.json.get('email')).first()
        if not authorization:
            authorization = Authorization(email=request.json.get('email'), rid=repository.id)
            ext.session.add(authorization)
            ext.session.commit()
            return json_success(authorization.to_json()), 201

        return json_success(authorization.to_json()), 200
