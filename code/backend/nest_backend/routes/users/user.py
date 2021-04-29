from flask import render_template, abort, jsonify, request
from ...database import *
from flask_jwt_extended import jwt_required
from ...gestione import *
from flask_cors import cross_origin


@cross_origin()
@jwt_required()
def page_user(email):
    """
    User <email>:
        + GET: gets info about the specified user.
        + PATCH: password, username -> Updates data about the user, returns the updated user.
        + DELETE: deletes the specified user.
    """
    user = find_user(get_jwt_identity())
    if request.method == "GET":
        if not email == user.email and not user.isAdmin:
            return json_error("Thou art not authorized."), 403
        target = find_user(email).to_json()
        if not target:
            json_error("Could not locate the user."), 404
        return json_success(target.to_json())
    elif request.method == "DELETE":
        if not user.isAdmin:
            return json_error("User is not admin."), 403
        deluser = request.json.get('email')
        target = find_user(deluser)
        if not target:
            return json_error("User not found."), 404
        if user == target:
            return json_error("The user cant delete himself. Its a sin."), 406
        Base.session.delete(target)
        Base.session.commit()
        return json_success("The user has been deleted.")
    elif request.method == "PATCH":
        if not email == user.email and not user.isAdmin:
            return json_error("Thou art not authorized."), 403
        target = find_user(email)
        if not target:
            json_error("Could not locate the user."), 404
        if request.json.get("username"):
            target.username = request.json.get("username")
        if request.json.get("password"):
            target.password = gen_password(request.json.get("password"))
        Base.session.commit()
