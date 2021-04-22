from flask import render_template, abort, jsonify, request
from ...database import *
from flask_jwt_extended import jwt_required
from ...gestione import *

@jwt_required()
def page_user_create():
    """
    The API call that allows to create new users. It requires:
    :form email: The user's email
    :form password: The users's password
    :form username: The users's username
    :return: Json-formatted data. If something goes wrong, it returns a
    {'result':'failure', 'content':'something blew up'}, else it returns {'result':'success', 'content':{newUser.to_json()}.
    """
    user = find_user(get_jwt_identity())
    if not user.isAdmin:
        abort(403)
    nUser = User(email=request.json.get("email"), password=gen_password(request.json.get("password")), username=request.json.get("username"))
    Base.session.add(nUser)
    Base.session.commit()
    return jsonify({"result":"success", "content":"something"})
