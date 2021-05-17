from flask import render_template, abort, jsonify, request
from nest_backend.database import *
from flask_jwt_extended import jwt_required, get_jwt_identity
from nest_backend.gestione import *
from flask_cors import cross_origin


@cross_origin()
@jwt_required()
@repository_auth
def page_repository_alerts(rid):
    """
    ---
    get:
        summary: Get a list of a repository alerts.
        parameters:
        - in: path
          schema: IntegerParameterSchema
        security:
        - jwt: []
        responses:
            '200':
                description: List of Alert schemas, incapsulated in Success.
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
        summary: Creates an alert and attaches it to the repository.
        security:
        - jwt: []
        requestBody:
            required: true
            content:
                application/json:
                    schema: CreateAlert
        responses:
            '201':
                description: The alert has been created successfully.
                content:
                    application/json:
                        schema: Alert
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

    repository = Repository.query.filter_by(id=rid).first()
    if not repository:
        return json_error("Could not find repository"), 404
    user = find_user(get_jwt_identity())
    if user.email != repository.owner_id:
        return json_error("You are not authorized."), 403

    if request.method == "GET":
        return json_success([alert.to_json() for alert in repository.alerts])

    if request.method == "POST":
        if 'name' not in request.json:
            return json_error("Missing name."), 400
        if 'limit' not in request.json:
            return json_error('Missing limit'), 400
        if 'window_size' not in request.json:
            return json_error('Missing window size'), 400
        if (mode := request.json.get("evaluation_mode")) is not None:
            try:
                mode = ConditionMode(mode)
            except KeyError:
                return json_error("Unknown `type` specified."), 400
            except Exception as e:
                return json_error("Unknown error:" + str(e)), 400
        else:
            return json_error("Evaluation mode was not provided."), 400

        alert = Alert(name=request.json['name'], limit=request.json['limit'], window_size=request.json['window_size'],
                      repository_id=rid, evaluation_mode=mode)
        ext.session.add(alert)
        ext.session.commit()
        if request.json['conditions'] is not None:
            for condition in request.json['conditions']:
                c = Condition.query.filter_by(id=condition['id']).first()
                if not c:
                    return json_error("Could not locate condition."), 404
                conn = MadeOf(aid=alert.id, cid=c.id)
                ext.session.add(conn)
                ext.session.commit()
        return json_success(alert.to_json()), 201
