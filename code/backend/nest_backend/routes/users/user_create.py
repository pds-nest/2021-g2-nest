from flask import render_template, abort, jsonify, request
from ...database import *
from flask_jwt_extended import jwt_required
from ...gestione import *
from flask_cors import cross_origin


@cross_origin()
@jwt_required()
def page_user_create():
    """
    The API call that allows to create new users. It requires:
    :parameter email: The user's email
    :parameter password: The users's password
    :parameter username: The users's username
    :return: Json-formatted data. If something goes wrong, it returns a
    {'result':'failure', 'content':'something blew up'}, else it returns {'result':'success', 'content':newUser.to_json().
    """
    user = find_user(get_jwt_identity())
    if not user.isAdmin:
        abort(403)
    new_user = User(email=request.json.get("email"), password=gen_password(request.json.get("password")),
                    username=request.json.get("username"))
    Base.session.add(new_user)
    Base.session.commit()
    return json_success(new_user.to_json())
