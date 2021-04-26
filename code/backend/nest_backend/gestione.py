"""
A utilities Python Module.
--------------------------

Gestione adds many fancy thingamajigs to the flask application, such as a login system and such.
"""

from .database import *
import bcrypt
import functools
from flask_jwt_extended import get_jwt_identity
from flask import request, jsonify


def authenticate(username, password):
    """
    Authentication method. It checks if the combination of username+password is a valid match. If not, it returns None.
    :param username: the user's email
    :param password: the user's password
    :return: if the credentials are correct, it returns the user. Else, it returns None.
    """
    user = User.query.filter_by(email=username).first()
    try:
        if bcrypt.checkpw(bytes(password, encoding="utf-8"), user.password):
            return user
    except AttributeError:
        # Se non esiste l'Utente
        return None


def identity(payload):
    """
    Authentication verification method. It checks if the user is in fact registered on the server.
    It is required by Flask-JWT, and shouldnt be used alone.
    :param payload: the reqest payload.
    :return: an User or None. It depends whether the user is actually registered on the platform.
    """
    user_id = payload['identity']
    user = User.query.filter_by(id=user_id).first()
    if user:
        return user.id
    return None


def gen_password(password):
    """
    It generates an hashed password.
    :param password: the password that needs to be hashed.
    :return: the password's hash.
    """
    return bcrypt.hashpw(bytes(password, "utf-8"), bcrypt.gensalt())


def find_user(email):
    return User.query.filter_by(email=email).first()


def admin_or_403(f):
    @functools.wraps(f)
    def func(*args, **kwargs):
        current_user = get_jwt_identity()
        return f(*args, **kwargs)

    return func


def repository_auth(f):
    @functools.wraps(f)
    def func(*args, **kwargs):
        user = find_user(get_jwt_identity())
        repository_id = request.json.get("id")
        if not repository_id:
            return jsonify({"result": "failure", "msg": "Missing one or more parameters."}), 400
        repository = Repository.query.filter_by(id=repository_id)
        if not repository:
            return jsonify({"result": "failure", "msg": "Can't find repository."}), 404
        if repository.owner_id != user.email:
            return jsonify({"result": "failure",
                            "msg": "Stop right there, criminal scum! Nobody accesses protected data under MY watch!"}), 403
        return f(*args, **kwargs)

    return func


def json_error(msg):
    return jsonify({"result": "failure", 'msg': msg})


def json_success(data):
    return jsonify({"result": "success", "data": data})
