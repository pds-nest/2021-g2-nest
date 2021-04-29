from flask import render_template, abort, jsonify, request
from ...database import *
from flask_jwt_extended import jwt_required
from ...gestione import *
from flask_cors import cross_origin


@cross_origin()
@jwt_required()
def page_users():
    """
    Users:
        + GET: gets info about all the users of the platform. Requires the user to be admin.
        + POST: email, password, username -> Creates a new user and returns it. Requires the user to be admin.
    """
    user = find_user(get_jwt_identity())
    if request.method == "GET":
        if not user.isAdmin:
            return json_error("User is not admin. Thou art not authorized"), 403
        users = User.query.all()
        return json_success([user.to_json() for user in users])
    if request.method == "POST":
        if not user.isAdmin:
            return json_error("User is not admin. Thou art not authorized."), 403
        new_user = User(email=request.json.get("email"), password=gen_password(request.json.get("password")),
                        username=request.json.get("username"))
        Base.session.add(new_user)
        Base.session.commit()
        return json_success(new_user.to_json())
