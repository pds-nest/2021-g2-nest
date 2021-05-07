from flask import render_template, abort, jsonify, request
from nest_backend.database import *
from flask_jwt_extended import jwt_required
from nest_backend.gestione import *
from flask_cors import cross_origin
import datetime


@cross_origin()
@jwt_required()
@repository_auth
def page_alert(aid):
    """
    ---
    get:
        summary: Get details about an alert.
        parameters:
        - in: path
          schema: AlertParameterSchema
        security:
        - jwt: []
        responses:
            '200':
                description: The details about the requested alert. The schema is incapsulated in Success.
                content:
                    application/json:
                        schema: Alert
            '404':
                description: Could not find the requested repository.
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
            - alert-related
    delete:
        summary: Deletes an alert.
        parameters:
        - in: path
          schema: AlertParameterSchema
        security:
        - jwt: []
        responses:
            '200':
                description: The repository has been deleted successfully.
            '404':
                description: Could not find the requested repository.
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
            '500':
                description: Could not delete the repository.
                content:
                    application/json:
                        schema: Error
        tags:
            - alert-related
    patch:
        summary: Updates an alert.
        security:
        - jwt: []
        requestBody:
            required: true
            content:
                application/json:
                    schema: CreateAlert
        parameters:
        - in: path
          schema: AlertParameterSchema

        responses:
            '200':
                description: The repository has been updated successfully.
                content:
                    application/json:
                        schema: Alert
            '404':
                description: Could not find the requested repository.
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
            - alert-related
    """
    user = find_user(get_jwt_identity())
    alert = Alert.query.filter_by(id=aid).first()
    if not alert:
        return json_error("Could not find alert."), 404
    if alert.repository not in [a.repository for a in user.authorizations] + user.owner_of:
        json_error("You are not authorized to proceed."), 403
    if request.method == "GET":
        return json_success(alert.to_json()), 200
    if alert.repository not in user.owner_of:
        json_error("You are not authorized to proceed."), 403
    if request.method == "PATCH":
        if 'name' in request.json:
            alert.name = request.json['name']
        if 'limit' in request.json:
            alert.limit = request.json['limit']
        if 'window_size' in request.json:
            alert.window_size = request.json['window_size']
        ext.session.commit()
        return json_success(alert.to_json()), 200
    elif request.method == "DELETE":
        try:
            ext.session.delete(alert)
            ext.session.commit()
        except Exception:
            return json_error("Something went wrong while deleting alert."), 500
        return json_success("Deletion completed."), 200
    elif request.method == "PUT":
        pass

