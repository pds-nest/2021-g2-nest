from flask import render_template, abort, jsonify, request
from ...database import *
from flask_jwt_extended import jwt_required
from ...gestione import *
from flask_cors import cross_origin


@cross_origin()
@jwt_required()
@repository_auth
def page_repository_add_condition():
    """
    API call that allows to add conditions to a repository.
    :form id: Repository ID
    :form type: The type of the condition. It can either be an 'hashtag', a 'location' or 'time'
    :form content: The content of the condition (#PdS2021, Roma, 18:00)
    :returns: a JSON string that tells whether or not the procedure was a success.
    """
    type = request.json.get("type")
    if not type or type not in dir(ConditionType):
        return jsonify({"result": "failure", "msg": "Could not understand the type of the condition."}), 400
    content = request.json.get("content")
    if not content:
        return jsonify({"result": "failure", "msg": "Could not find the content"}), 400
    condition = Condition.query.filter(Condition.content.ilike(str(content))).filter_by(type=ConditionType.__getattr__(str(type)).value).first()
    if not condition:
        condition = Condition(content=content, type=ConditionType.__getattr__(str(type)).value)
        Base.session.add(condition)
    repository = Repository.query.filter_by(request.json.get("id"))
    if Uses.query.filter_by(cid=condition.id, rid=repository.id):
        return jsonify({"result": "failure", "msg": "This condition is already connected to the repository."}), 406
    Base.session.add(Uses(cid=condition.id, rid=repository.id))
    Base.session.commit()
    return jsonify({"result": "success", "content": "Condition added successfully."}), 200