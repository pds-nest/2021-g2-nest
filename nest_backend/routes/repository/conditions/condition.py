from flask import render_template, abort, jsonify, request
from nest_backend.database import *
from flask_jwt_extended import jwt_required, get_jwt_identity
from nest_backend.gestione import *
from flask_cors import cross_origin


@cross_origin()
@jwt_required()
def page_condition(cid):
    """
    ---
    get:
        summary: Get the details of a condition.
        parameters:
        - in: path
          schema: ConditionParameterSchema
        security:
        - jwt: []
        responses:
            '200':
                description: Details about a certain condition.
                content:
                    application/json:
                        schema: Condition
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
            - condition-related
    delete:
        summary: Delete a condition.
        parameters:
        - in: path
          schema: ConditionParameterSchema
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
                description: The repository could not be found.
                content:
                    application/json:
                        schema: Error
        tags:
            - condition-related
    patch:
        summary: Update a condition.
        parameters:
        - in: path
          schema: ConditionParameterSchema
        security:
        - jwt: []
        requestBody:
            required: true
            content:
                application/json:
                    schema: CreateCondition
        responses:
            '204':
                description: The user is not logged in.
                content:
                    application/json:
                        schema: Condition
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
            - condition-related
    """
    condition = Condition.query.filter_by(id=cid).first()
    user = find_user(get_jwt_identity())
    if not condition:
        return json_error("Could not find the condition."), 404
    if condition.repository not in [a.repository for a in user.authorizations] + user.owner_of and not user.isAdmin:
        return json_error("You lack the authorization to proceed, pal."), 403
    if request.method == "GET":
        return json_success(condition.to_json()), 200
    if condition.repository not in user.owner_or and not user.isAdmin:
        return json_error("You lack the authorization to proceed, pal."), 403
    if request.method == "PATCH":
        if (type_ := request.json.get("type")) is not None:
            try:
                type_ = ConditionType(type_)
                condition.type = type_
            except KeyError:
                return json_error("Unknown `type` specified."), 400

        if content := request.json.get("content"):
            condition.content = content
        ext.session.commit()
        return json_success(condition.to_json()), 204
    if request.method == "DELETE":
        ext.session.delete(condition)
        ext.session.commit()
        return json_success("Deleted."), 204
