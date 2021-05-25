from flask import render_template, abort, jsonify, request
from nest_backend.database import *
from flask_jwt_extended import jwt_required, get_jwt_identity
from nest_backend.gestione import *
from flask_cors import cross_origin
from nest_backend.errors import *


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
        parameters:
        - in: path
          schema: IntegerParameterSchema
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
        return json_error("Could not find repository", REPOSITORY_NOT_FOUND), 404
    user = find_user(get_jwt_identity())
    if user.email != repository.owner_id:
        return json_error("You are not authorized.", REPOSITORY_NOT_OWNER), 403

    if request.method == "GET":
        return json_success([alert.to_json() for alert in repository.alerts])

    if request.method == "POST":
        if 'name' not in request.json:
            return json_error("Missing name.", ALERT_NO_NAME), 400
        if 'limit' not in request.json:
            return json_error('Missing limit', ALERT_NO_LIMIT), 400
        if 'window_size' not in request.json:
            return json_error('Missing window size', ALERT_NO_WINDOW), 400
        if (mode := request.json.get("evaluation_mode")) is not None:
            try:
                mode = ConditionMode(mode)
            except KeyError:
                return json_error("Unknown `type` specified.", GENERIC_ENUM_INVALID), 400
            except Exception as e:
                return json_error("Unknown error:" + str(e), GENERIC_UFO), 400
        else:
            return json_error("Evaluation mode was not provided.", ALERT_NO_EVALUATION), 400

        alert = Alert(name=request.json['name'], limit=request.json['limit'], window_size=request.json['window_size'],
                      repository_id=rid, evaluation_mode=mode)
        ext.session.add(alert)
        ext.session.commit()
        if request.json['conditions'] is not None:
            for condition in request.json['conditions']:
                if (type_ := condition.get("type")) is None:
                    return json_error("Missing `type` parameter.", GENERIC_MISSING_FIELDS), 400
                try:
                    type_ = ConditionType(type_)
                except KeyError:
                    return json_error("Unknown `type` specified.", GENERIC_ENUM_INVALID), 400
                except Exception as e:
                    return json_error("Unknown error: " + str(e)), 400
                if not (content := condition.get("content")):
                    return json_error("Missing `content` parameter.", GENERIC_MISSING_FIELDS), 400
                if type_ == ConditionType.hashtag:
                    content = hashtag_validator(content)
                c = Condition(content=content, type=type_, repository_id=rid)
                ext.session.add(c)
                ext.session.commit()
                conn = MadeOf(aid=alert.id, cid=c.id)
                ext.session.add(conn)
                ext.session.commit()
        return json_success(alert.to_json()), 201
