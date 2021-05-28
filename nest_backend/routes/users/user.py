from flask import render_template, abort, jsonify, request
from nest_backend.database import *
from flask_jwt_extended import jwt_required, get_jwt_identity
from nest_backend.gestione import *
from flask_cors import cross_origin
from nest_backend.errors import *


@cross_origin()
@jwt_required()
def page_user(email):
    """
    ---
    get:
        summary: Get details about a user.
        parameters:
        - in: path
          schema: EmailParameterSchema
        security:
        - jwt: []
        responses:
            '200':
                description: The details about the requested user. The schema is incapsulated in Success.
                content:
                    application/json:
                        schema: User
            '404':
                description: Could not find the requested user.
                content:
                    application/json:
                        schema: Error
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
            - user-related
    delete:
        summary: Deletes a user.
        parameters:
        - in: path
          schema: EmailParameterSchema
        security:
        - jwt: []
        responses:
            '204':
                description: The user has been deleted successfully.
            '404':
                description: Could not find the requested user.
                content:
                    application/json:
                        schema: Error
            '403':
                description: The user is not authorized.
                content:
                    application/json:
                        schema: Error
            '406':
                description: The user tried to delete himself.
                content:
                    application/json:
                        schema: Error
            '500':
                description: Something went wrong while trying to delete the user.
                content:
                    application/json:
                        schema: Error
            '401':
                description: The user is not logged in.
                content:
                    application/json:
                        schema: Error
        tags:
            - user-related
            - admin-only
    patch:
        summary: Updates a user.
        parameters:
        - in: path
          schema: EmailParameterSchema
        security:
        - jwt: []
        responses:
            '204':
                description: The user has been updated successfully.
                content:
                    application/json:
                        schema: User
            '404':
                description: Could not find the requested user.
                content:
                    application/json:
                        schema: Error
            '403':
                description: The user is not authorized.
                content:
                    application/json:
                        schema: Error
            '406':
                description: The user tried to delete himself.
                content:
                    application/json:
                        schema: Error
            '401':
                description: The user is not logged in.
                content:
                    application/json:
                        schema: Error
        tags:
            - user-related
    """
    user = find_user(get_jwt_identity())
    target = find_user(email)
    if not target:
        return json_error("Could not locate the user.", USER_NOT_FOUND), 404
    if request.method == "GET":
        if not email == user.email and not user.isAdmin:
            return json_error("Thou art not authorized.", USER_NOT_AUTHORIZED), 403
        return json_success(target.to_json())
    elif request.method == "DELETE":
        if not user.isAdmin:
            return json_error("User is not admin.", USER_NOT_ADMIN), 403
        if user == target:
            return json_error("The user cant delete himself. Its a sin.", USER_PREVENT_SEPPUKU), 406
        repos = target.owner_of
        for repository in repos:
            repository.owner_id = user.email
            repository.is_active = False
        for authorization in target.authorizations:
            ext.session.delete(authorization)
        ext.session.commit()
        ext.session.delete(target)
        try:
            ext.session.commit()
        except Exception as e:
            ext.session.rollback()
            return json_error("Could not delete the user.", USER_DELETION_ERROR), 500
        return json_success(""), 204  # "The user has been deleted."
    elif request.method == "PATCH":
        if not email == user.email and not user.isAdmin:
            return json_error("Thou art not authorized.", USER_NOT_AUTHORIZED), 403
        target = find_user(email)
        if request.json.get("username"):
            target.username = request.json.get("username")
        if request.json.get("password"):
            target.password = gen_password(request.json.get("password"))
        ext.session.commit()
        return json_success(target.to_json()), 200  # 204
