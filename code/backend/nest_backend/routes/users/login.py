from flask import render_template, abort, jsonify, request
from ...database import *
from ...gestione import *
from flask_jwt_extended import create_access_token


def page_login():
    """
    The API call that allows to log-in. It requires:
    :form email: The user's email
    :form password: The users's password
    :return: Json-formatted data. If the login is successful, it will contain the access_token.

    The access_token must be included in the Authorization header, using the format Bearer <token>.
    """
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if authenticate(email, password):
        access_token = create_access_token(identity=email)
        return jsonify({"result": "success", "access_token": access_token}), 201
    return jsonify({"result": "failure", "msg": "Bad username or password."}), 401
