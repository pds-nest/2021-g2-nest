from flask import render_template, abort, jsonify, request
from nest_backend.database import *
from flask_jwt_extended import jwt_required, get_jwt_identity
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
            '204':
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
        summary: Updates an alert and the boolops structure.
        security:
        - jwt: []
        requestBody:
            required: true
            content:
                application/json:
                    schema: Alert
        parameters:
        - in: path
          schema: AlertParameterSchema

        responses:
            '204':
                description: The alert has been updated successfully.
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
    if alert.repository_id not in user.owner_of:
        return json_error("The user is not authorized."), 403
    if not alert:
        return json_error("Could not find alert."), 404
    if alert.repository not in [a.repository for a in user.authorizations] + user.owner_of:
        return json_error("You are not authorized to proceed."), 403
    if request.method == "GET":
        return json_success(alert.to_json()), 200
    if alert.repository not in user.owner_of:
        return json_error("You are not authorized to proceed."), 403
    if request.method == "PATCH":
        if 'name' in request.json:
            alert.name = request.json['name']
        if 'limit' in request.json:
            alert.limit = request.json['limit']
        if 'window_size' in request.json:
            alert.window_size = request.json['window_size']
        ext.session.commit()
        return json_success(alert.to_json()), 204
    elif request.method == "DELETE":
        try:
            ext.session.delete(alert)
            ext.session.commit()
        except Exception:
            return json_error("Something went wrong while deleting alert."), 500
        return json_success("Deletion completed."), 204
    elif request.method == "PUT":
        if not json_request_authorizer(request.json, alert):
            return json_error("Missing one or more parameters in repository json."), 400
        alert.limit = request.json['limit']
        alert.name = request.json['name']
        alert.window_size = request.json['window_size']
        if (mode := request.json.get("evaluation_mode")) is not None:
            try:
                alert.evaluation_mode = ConditionMode(mode)
            except KeyError:
                return json_error("Unknown `type` specified."), 400
            except Exception as e:
                return json_error("Unknown error:" + str(e)), 400
        if request.json['conditions'] is not None:
            # Possibile vulnearabilità! Un utente potrebbe aggiungere conditions non del suo repo!
            for c in request.json['conditions']:
                if c['id'] not in alert.repository.conditions:
                    return json_error("Stop! You violated the law!"), 403
            # Wow very pythonic so much wow
            # Obtain list of no longer needed connections
            to_be_deleted = [c.cid for c in alert.conditions if
                             c.cid not in [json['id'] for json in request.json['conditions']]]
            # RIP AND TEAR UNTIL ITS DONE
            for elem in to_be_deleted:
                conn = MadeOf.query.filter_by(cid=elem, aid=alert.id).first()
                if conn:
                    ext.session.delete(conn)
                    ext.session.commit()
            for c in request.json['conditions']:
                conn = MadeOf(cid=c['id'], aid=alert.id)
                ext.session.add(conn)
                ext.session.commit()
        return json_success(alert.to_json()), 200
