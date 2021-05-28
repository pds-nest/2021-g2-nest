from flask import render_template, abort, jsonify, request
from nest_backend.database import *
from flask_jwt_extended import jwt_required, get_jwt_identity
from nest_backend.gestione import *
from flask_cors import cross_origin
import datetime
from nest_backend.errors import *


@cross_origin()
@jwt_required()
@repository_auth
def page_repository(rid):
    """
    ---
    get:
        summary: Get details about a repository.
        parameters:
        - in: path
          schema: IntegerParameterSchema
        security:
        - jwt: []
        responses:
            '200':
                description: The details about the requested schema. The schema is incapsulated in Success.
                content:
                    application/json:
                        schema: Repository
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
            - repository-related
    delete:
        summary: Deletes a repository.
        parameters:
        - in: path
          schema: IntegerParameterSchema
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
            - repository-related
    patch:
        summary: Updates a repository.
        security:
        - jwt: []
        requestBody:
            required: true
            content:
                application/json:
                    schema: RepositoryUpdate
        parameters:
        - in: path
          schema: IntegerParameterSchema

        responses:
            '204':
                description: The repository has been updated successfully.
                content:
                    application/json:
                        schema: Repository
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
            - repository-related
    put:
        summary: Overwrites a repository.
        security:
        - jwt: []
        requestBody:
            required: true
            content:
                application/json:
                    schema: Repository
        parameters:
        - in: path
          schema: IntegerParameterSchema

        responses:
            '200':
                description: The repository has been updated successfully.
                content:
                    application/json:
                        schema: Repository
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
            '400':
                description: The request was malformed.
                content:
                    application/json:
                        schema: Error
        tags:
            - repository-related
    """
    user = find_user(get_jwt_identity())
    repository = Repository.query.filter_by(id=rid, is_deleted=False).first()
    if not repository:
        return json_error("Could not find repository.", REPOSITORY_NOT_FOUND), 404
    if request.method == "GET":
        return json_success(repository.to_json()), 200
    elif request.method == "PATCH":
        if repository.owner_id != user.email:
            return json_error("You are not the owner of this repository.", REPOSITORY_NOT_OWNER), 403
        if 'name' in request.json:
            repository.name = request.json['name']
        if 'close' in request.json and not repository.end and repository.is_active:
            repository.end = datetime.datetime.now()
            repository.is_active = False
        if 'open' in request.json and not repository.is_active and not repository.end:
            repository.is_active = True
        if 'evaluation_mode' in request.json:
            try:
                evaluation_mode = ConditionMode(request.json['evaluation_mode'])
            except KeyError:
                return json_error("Unknown `type` specified.", GENERIC_ENUM_INVALID), 400
            repository.evaluation_mode = evaluation_mode
        ext.session.commit()
        return json_success(repository.to_json()), 204
    elif request.method == "DELETE":
        if repository.owner_id != user.email and not user.isAdmin:
            return json_error("You are not the owner of this repository.", REPOSITORY_NOT_OWNER), 403
        try:
            repository.is_deleted = True
            ext.session.commit()
        except Exception as e:
            ext.session.rollback()
            return json_error("Cant delete repository because of dependencies.", REPOSITORY_DEPENDENCY_FAILURE), 500
        return json_success("Success"), 204
    elif request.method == "PUT":
        if not json_request_authorizer(request.json, repository):
            return json_error("Missing one or more parameters in repository json.", GENERIC_MISSING_FIELDS), 400
        # Users will be tolerated if they change parameters they're not supposed to touch. We'll ignore them for now.
        try:
            evaluation_mode = ConditionMode(request.json['evaluation_mode'])
        except KeyError:
            return json_error("Unknown `type` specified.", GENERIC_ENUM_INVALID), 400
        repository.evaluation_mode = evaluation_mode
        repository.name = request.json['name']
        repository.is_active = request.json['is_active']
        ext.session.commit()
        ids = [c['id'] for c in request.json['conditions'] if c['id']]
        # Delete no longer needed conditions.
        try:
            for c in repository.conditions:
                if c.id not in ids:
                    for t in c.tweets:
                        ext.session.delete(t)
                    for a in c.alerts:
                        ext.session.delete(a)
                    ext.session.commit()
                    ext.session.delete(c)
                    ext.session.commit()
        except Exception as e:
            return json_error("Could not delete conditions.", GENERIC_UFO), 500
        # Create brand new conditions
        for c in request.json['conditions']:
            if not c['id']:
                try:
                    type_ = ConditionType(c['type'])
                except KeyError:
                    return json_error("Unknown `type` specified.", GENERIC_ENUM_INVALID), 400
                content = c['content']
                if type_ == ConditionType.hashtag:
                    content = hashtag_validator(content)
                ext.session.add(Condition(type=type_, content=content, repository_id=rid))
        ext.session.commit()
        return json_success(repository.to_json()), 200
