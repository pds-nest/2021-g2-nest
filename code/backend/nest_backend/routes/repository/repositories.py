from flask import render_template, abort, jsonify, request
from nest_backend.database import *
from flask_jwt_extended import jwt_required
from nest_backend.gestione import *
import datetime
from flask_cors import cross_origin


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
                description: The list of the repositories related to the user (divided in "owner" and "spectator" dict keys), incapsulated in Success.
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
                    schema: CreateRepository
        responses:
            '200':
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
        spectator = Authorization.query.filter_by(email=user.email).join(Repository)
        if request.args.get("onlyActive"):
            owner = owner.filter_by(is_active=True)
            spectator = spectator.filter(Repository.is_active)
        elif request.args.get("onlyDead"):
            owner = owner.filter_by(is_active=False)
            spectator = spectator.filter(not Repository.is_active)
        owner = owner.all()
        spectator = spectator.all()
        return json_success({"owner": [r.to_json() for r in owner],
                             "spectator": [r.repository.to_json() for r in spectator]})
    elif request.method == "POST":
        name = request.json.get("name")
        if not name:
            return json_error("Missing one or more parameters"), 400
        repository = Repository(name=name, owner_id=user.email)
        Base.session.add(repository)
        Base.session.commit()
        return json_success(repository.to_json()), 200
