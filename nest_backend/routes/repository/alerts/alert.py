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
        root_id = alert.to_json()['root_operation']['id']
        root = BoolOperation.filter_by(id=root_id).first()
        if not root:
            return json_error("Could not find original root element."), 404
        # No longer used chain element deletion
        l = []
        bool_list = root.get_chains_ids(l)
        for element in alert.operations:
            if element.id not in bool_list:
                if element.id == root.id:
                    root = None
                ext.session.delete(element)
                ext.session.commit()
        if request.json['root-operation'].get('id'):  # If an alternative root is already present.
            new_root_test = BoolOperation.filter_by(id=request.json['root_operation']['id']).first()
            if new_root_test and new_root_test != root:
                new_root_test.is_root = True
                ext.session.commit()
        else:  # If the alternative root needs to be brand-new.
            condition_id = None
            if request.json['root_operation'].get('condition'): # Is the new alternative connected to a condition?
                if not Condition.query.filter_by(id=request.json['root_operation']['condition']['id'],
                                                 repository_id=alert.repository_id).first():
                    return json_error("One of the provided IDs is incorrect."), 404
                condition_id = request.json['root_operation']['condition']['id']
            if (type_ := request.json['root-operation']['operation']) is not None:
                try:
                    type_ = OperationType(type_)
                except KeyError:
                    return json_error("Unknown `operation` specified."), 400
            root = BoolOperation(operation=type_, is_root=True, alert_id=aid)
            ext.session.add(root)
            ext.session.commit()
        root = BoolOperation.filter_by(id=request.json['root_operation']['id']).first()
        try:
            recursion(root, ext, request.json['root_operation'])
        except FileNotFoundError:
            return json_error("One of the provided IDs is incorrect"), 404
        except KeyError:
            return json_error("Unknown field specified."), 400
        return json_success(alert.to_json()), 200


def create_node(node, ext, json, id):
    # Check if the node already exists
    id_1 = json[f'node_{id}']['id']
    if id_1:
        node_1 = BoolOperation.query.filter_by(id=id_1).first()
        if not node_1:
            raise FileNotFoundError
    else:
        # The node is new.
        condition_id = None
        if json[f'node_{id}'].get('condition'):
            condition = Condition.query.filter_by(
                id=json[f'node_{id}']['condition']['id']).filter(
                Condition.repository_id == node.alert.repository_id).first()
            if not condition:
                raise FileNotFoundError
            condition_id = condition.id
        if (type_ := json[f'node_{id}']['operation']) is not None:
            type_ = OperationType(type_)
        else:
            raise FileNotFoundError
        # Create new node
        node_1 = BoolOperation(operation=type_, is_root=False, condition_id=condition_id, alert_id=node.alert_id)
        ext.session.add(node_1)
        ext.session.commit()
    # Recursion goes brr
    recursion(node_1, ext, json['node_1'])


def recursion(node, ext, json):
    if json.get('node_1'): # Create node 1
        create_node(node, ext, json, 1)
    if json.get('node_2'): # Create node 2
        create_node(node, ext, json, 2)