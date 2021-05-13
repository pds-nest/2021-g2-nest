from flask import request
from flask_jwt_extended import jwt_required
from nest_backend.gestione import repository_auth, json_error, json_success, ConditionType, Condition, Repository, \
    find_user, get_jwt_identity
from nest_backend.database import ext
from flask_cors import cross_origin
from nest_backend.gestione import hashtag_validator


@cross_origin()
@jwt_required()
@repository_auth
def page_repository_tweets(rid):
    """
    ---
    get:
        summary: Get a list of a repository tweets.
        parameters:
        - in: path
          schema: IntegerParameterSchema
        security:
        - jwt: []
        responses:
            '200':
                description: List of Tweet schemas, incapsulated in Success.
            '401':
                description: The user is not logged in.
                content:
                    application/json:
                        schema: Error
            '403':
                description: The user is not authorized.
                content:
                    application/json:
                        schema: Error
            '404':
                description: The repository could not be found.
                content:
                    application/json:
                        schema: Error
        tags:
            - repository-related
    """

    repository = Repository.query.filter_by(id=rid).first()
    if not repository:
        return json_error("Could not find repository"), 404
    user = find_user(get_jwt_identity())

    if user.email != repository.owner_id:
        return json_error("You are not authorized."), 403

    if request.method == "GET":
        return json_success([t.tweet.to_json() for t in repository.tweets])
