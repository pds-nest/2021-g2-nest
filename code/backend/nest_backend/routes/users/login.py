from flask import render_template, abort, jsonify, request
from nest_backend.database import *
from nest_backend.gestione import *
from flask_jwt_extended import create_access_token
from flask_cors import cross_origin
from datetime import timedelta, datetime


@cross_origin()
def page_login():
    """
    ---
    post:
      summary: Attempt login.
      requestBody:
        required: true
        content:
            application/json:
                schema: I_Login
      responses:
        '201':
            description: Login successful, user authorized. The schema is incapsulated in Success.
            content:
                application/json:
                    schema: Login
        '401':
            description: User not authorized.
            content:
                application/json:
                    schema: Error
      tags:
          - user-related
    """
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if authenticate(email, password):
        # Find today's date
        now = datetime.now()
        # Add 30 days to it; that's your token expiration date
        delta = timedelta(days=30)
        expiration = now + delta
        access_token = create_access_token(identity=email, expires_delta=delta)
        user = find_user(email)
        return json_success({"access_token": access_token, 'user': user.to_json(), "expiration": expiration}), 201
    return json_error("Bad username or password."), 401
