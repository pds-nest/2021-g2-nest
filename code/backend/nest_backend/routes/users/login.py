from flask import render_template, abort, jsonify, request
from ...database import *
from ...gestione import *
from flask_jwt_extended import create_access_token
from flask_cors import cross_origin


@cross_origin()
def page_login():
    """
    The API call that allows to log-in. It requires:
    :form email: The user's email
    :form password: The users's password
    :return: Json-formatted data. If the login is successful, it will contain the access_token and the users data.

    The access_token must be included in the Authorization header, using the format Bearer <token>.
    """
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if authenticate(email, password):
        access_token = create_access_token(identity=email)
        user = find_user(email)
        return json_success({"access_token": access_token, 'user': user.to_json()}), 201
    return json_error("Bad username or password."), 401
