from flask import render_template, abort, jsonify, request
from nest_backend.database import *
from flask_jwt_extended import jwt_required
from nest_backend.gestione import *
from flask_cors import cross_origin


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
            '200':
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
            '200':
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
        return json_error("Could not locate the user."), 404
    if request.method == "GET":
        if not email == user.email and not user.isAdmin:
            return json_error("Thou art not authorized."), 403
        return json_success(target.to_json())
    elif request.method == "DELETE":
        if not user.isAdmin:
            return json_error("User is not admin."), 403
        if user == target:
            return json_error("The user cant delete himself. Its a sin."), 406
        ext.session.delete(target)
        try:
            ext.session.commit()
        except Exception:
            ext.session.rollback()
            return json_error("Could not delete the user."), 500
        return json_success("The user has been deleted.")
    elif request.method == "PATCH":
        if not email == user.email and not user.isAdmin:
            return json_error("Thou art not authorized."), 403
        target = find_user(email)
        if request.json.get("username"):
            target.username = request.json.get("username")
        if request.json.get("password"):
            target.password = gen_password(request.json.get("password"))
        ext.session.commit()
        return json_success(target.to_json())
