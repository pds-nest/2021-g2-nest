"""
Gestione adds many fancy thingamajigs to the flask application, such as a login system and such.
"""

from nest_backend.database import *
import bcrypt
import functools
from flask_jwt_extended import get_jwt_identity
from flask import jsonify
from re import sub
from .errors import GENERIC_UFO

__all__ = ["authenticate", "identity", "gen_password", "find_user", "admin_or_403",
           "repository_auth", "json_request_authorizer", "json_error",
           "json_success", "error_handler", "hashtag_validator"]


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
        repository_id = kwargs["rid"]
        if not repository_id:
            return json_error("Missing one or more parameters."), 400
        repository = Repository.query.filter_by(id=repository_id).first()
        if not repository:
            return json_error("Cant't find the repository."), 404
        if repository.owner_id != user.email and user.email not in [a.email for a in
                                                                    repository.authorizations] and not user.isAdmin:
            return json_error("Stop right there, criminal scum! Nobody accesses protected data under MY watch!"), 403
        return f(*args, **kwargs)

    return func


def json_error(msg, code=GENERIC_UFO):
    """
    Returns an error in json format
    :param code: the code of the error according to the spec.
    :param msg: the error message.
    :return: a json formatted string.
    """
    return jsonify({"result": "failure", 'msg': msg, 'code':code})


def json_success(data):
    """
    An happy little function. Its happy because the operation was successful.
    :param data: the thing you want to be returned
    :return: a json formatted string
    """
    return jsonify({"result": "success", "data": data})


def error_handler(e):
    try:
        print(f"{e.description} - {e.code}")
        return json_error(f"{e.description} - {e.code}"), 500
    except Exception:
        print(e)
        return json_error(f"{e.__repr__()}"), 500


def json_request_authorizer(json, serializable):
    json_keys = json.keys()
    serializable_keys = serializable.to_json().keys()
    return all(key in json_keys for key in serializable_keys)


def hashtag_validator(hashtag):
    return sub(
        "([^a-z0-9_\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff\u0100-\u024f\u0253-\u0254\u0256-\u0257\u0300-\u036f\u1e00-\u1eff\u0400-\u04ff\u0500-\u0527\u2de0-\u2dff\ua640-\ua69f\u0591-\u05bf\u05c1-\u05c2\u05c4-\u05c5\u05d0-\u05ea\u05f0-\u05f4\ufb12-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4f\u0610-\u061a\u0620-\u065f\u066e-\u06d3\u06d5-\u06dc\u06de-\u06e8\u06ea-\u06ef\u06fa-\u06fc\u0750-\u077f\u08a2-\u08ac\u08e4-\u08fe\ufb50-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\u200c\u0e01-\u0e3a\u0e40-\u0e4e\u1100-\u11ff\u3130-\u3185\ua960-\ua97f\uac00-\ud7af\ud7b0-\ud7ff\uffa1-\uffdc\u30a1-\u30fa\u30fc-\u30fe\uff66-\uff9f\uff10-\uff19\uff21-\uff3a\uff41-\uff5a\u3041-\u3096\u3099-\u309e\u3400-\u4dbf\u4e00-\u9fff\u20000-\u2a6df\u2a700-\u2b73\u2b740-\u2b81\u2f800-\u2fa1])", "", hashtag)
