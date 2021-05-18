from flask import render_template, abort, jsonify, request
from nest_backend.database import *
from flask_jwt_extended import jwt_required, get_jwt_identity
from nest_backend.gestione import *
from flask_cors import cross_origin
from nest_backend.errors import *


@cross_origin()
@jwt_required()
def page_users():
    """
    ---
    get:
        summary: Get a list of users.
        security:
        - jwt: []
        responses:
            '200':
                description: A list of User schemas, incapsulated in Success.
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
            - admin-only
    post:
        summary: Creates a user.
        security:
        - jwt: []
        requestBody:
            required: true
            content:
                application/json:
                    schema: CreateUser
        responses:
            '201':
                description: The user has been created successfully.
                content:
                    application/json:
                        schema: User
            '403':
                description: The user is not authorized.
                content:
                    application/json:
                        schema: Error
            '406':
                description: The user already exists.
                content:
                    application/json:
                        schema: Error
            '401':
                description: The user is not logged in.
                content:
                    application/json:
                        schema: Error
        tags:
            - admin-only
    """
    user = find_user(get_jwt_identity())
    if request.method == "GET":
        if not user.isAdmin:
            return json_error("User is not admin. Thou art not authorized", USER_NOT_ADMIN), 403
        users = User.query.all()
        return json_success([user.to_json() for user in users]), 200
    if request.method == "POST":
        if not user.isAdmin:
            return json_error("User is not admin. Thou art not authorized.", USER_NOT_ADMIN), 403
        if not request.json.get("email") or not request.json.get("password") or not request.json.get("username"):
            return json_error("Missing required fields.", GENERIC_MISSING_FIELDS), 400
        if User.query.filter_by(email=request.json.get("email")).first():
            return json_error("User already exists.", GENERIC_ALREADY_EXISTS), 406
        new_user = User(email=request.json.get("email"), password=gen_password(request.json.get("password")),
                        username=request.json.get("username"))
        ext.session.add(new_user)
        ext.session.commit()
        return json_success(new_user.to_json()), 201
