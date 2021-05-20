from flask import render_template, abort, jsonify, request
from nest_backend.database import *
from flask_jwt_extended import jwt_required, get_jwt_identity
from nest_backend.gestione import *
from flask_cors import cross_origin
from nest_backend.errors import *


@cross_origin()
@jwt_required()
def page_authorization(rid, email):
    """
    ---
    delete:
        summary: Delete an authorization.
        parameters:
        - in: path
          schema: AuthorizationParameterSchema
        security:
        - jwt: []
        responses:
            '204':
                description: The deletion was successful.
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
    repository = Repository.query.filter_by(id=rid).first()
    user = find_user(get_jwt_identity())
    if not repository:
        return json_error("Could not find the repository.", REPOSITORY_NOT_FOUND), 404
    if user != repository.owner:
        return json_error("You are not authorized.", USER_NOT_AUTHORIZED), 403
    authorization = Authorization.query.filter_by(rid=rid, email=email).first()
    if not authorization:
        return json_error("Could not find the authorization", AUTHORIZATION_NOT_FOUND), 404
    if request.method == "DELETE":
        ext.session.delete(authorization)
        ext.session.commit()
        return json_success("Deleted."), 204
