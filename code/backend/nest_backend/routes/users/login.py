from flask import render_template, abort, jsonify, request
from ...database import *
from ...gestione import *
from flask_jwt_extended import create_access_token
from flask_cors import cross_origin
from datetime import timedelta, datetime


@cross_origin()
def page_login():
    """
    The API call that allows to log-in. It requires:
    :parameter email: The user's email
    :parameter password: The users's password
    :returns: Json-formatted data. If the login is successful, it will contain the access_token and the users data.

    The access_token must be included in the Authorization header, using the format Bearer <token>.
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
