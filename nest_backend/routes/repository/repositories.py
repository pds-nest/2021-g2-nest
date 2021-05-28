from flask import render_template, abort, jsonify, request
from nest_backend.database import *
from flask_jwt_extended import jwt_required, get_jwt_identity
from nest_backend.gestione import *
import datetime
from flask_cors import cross_origin
from nest_backend.errors import *
from nest_crawler.repo_search import search_repo_conditions

import threading


def tweet_importer(rid):
    import nest_backend.app
    with nest_backend.app.app.app_context():
        search_repo_conditions(rid)


@cross_origin()
@jwt_required()
def page_repositories():
    """
    ---
    get:
        summary: Get a list of repositories.
        security:
        - jwt: []
        responses:
            '200':
                description: The list of the repositories related to the user, incapsulated in Success.
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
    post:
        summary: Creates a repository.
        security:
        - jwt: []
        requestBody:
            required: true
            content:
                application/json:
                    schema: Repository
        responses:
            '201':
                description: The user has been created successfully.
                content:
                    application/json:
                        schema: Repository
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
    """
    user = find_user(get_jwt_identity())
    if request.method == "GET":
        owner = Repository.query.filter_by(owner_id=user.email)
        spectator = Authorization.query.filter_by(email=user.email).join(Repository).filter_by(is_deleted=False)
        if request.args.get("onlyActive"):
            owner = owner.filter_by(is_active=True)
            spectator = spectator.filter(Repository.is_active)
        elif request.args.get("onlyDead"):
            owner = owner.filter_by(is_active=False)
            spectator = spectator.filter(not Repository.is_active)
        owner = owner.all()
        spectator = spectator.all()
        return json_success([r.to_json() for r in owner if not r.is_deleted] + [r.repository.to_json() for r in spectator if not r.repository.is_deleted])
    elif request.method == "POST":
        # Users will be tolerated if they change parameters they're not supposed to touch. We'll ignore them for now.
        if not request.json.get("name") or not request.json.get("conditions") or not str(
                request.json.get("evaluation_mode")):
            return json_error("Missing arguments.", GENERIC_MISSING_FIELDS), 400
        name = request.json.get("name")
        try:
            evaluation_mode = ConditionMode(request.json['evaluation_mode'])
        except KeyError:
            return json_error("Unknown `type` specified.", GENERIC_ENUM_INVALID), 400
        except Exception as e:
            return json_error("Unknown error: " + str(e)), 400
        repository = Repository(name=name, owner_id=user.email, is_active=False, evaluation_mode=evaluation_mode)
        ext.session.add(repository)
        ext.session.commit()
        conditions = [c for c in repository.conditions if c.id not in [a['id'] for a in request.json['conditions'] if
                                                                       a['id'] in [b.id for b in
                                                                                   repository.conditions]]]
        for c in conditions:
            ext.session.delete(c)
            ext.session.commit()
        # Create brand new conditions
        for c in request.json['conditions']:
            if not c['id']:
                try:
                    type_ = ConditionType(c['type'])
                except KeyError:
                    return json_error("Unknown `type` specified.", GENERIC_ENUM_INVALID), 400
                ext.session.add(Condition(type=type_, content=c['content'], repository_id=repository.id))
                ext.session.commit()
        repository.is_active = True
        repository.start = datetime.datetime.now()
        ext.session.commit()
        try:
            thread = threading.Thread(target=tweet_importer, args=(repository.id,))
            thread.start()
        except Exception:
            return json_success(repository.to_json()), 201
        return json_success(repository.to_json()), 201
