from marshmallow import Schema, fields


class UserSchema(Schema):
    email = fields.String(description="The user's email.")
    username = fields.String(description="The user's username.")
    isAdmin = fields.Boolean(description="True if the user is an administrator.")


class LoginSchema(Schema):
    access_token = fields.String(description="The access token that authorizes the user to proceed.")
    expiration = fields.DateTime(description="The expiration date of the authorization code.")
    user = fields.Nested(UserSchema)


class InputLoginSchema(Schema):
    email = fields.String(description="The user's email.")
    password = fields.String(description="The user's password.")


class ErrorSchema(Schema):
    result = fields.String(description="Contains a string that informs if the procedure was successful.")
    msg = fields.String(description="Contains a description of the error.")
    code = fields.String(description="Error code")


class AuthorizationSchema(Schema):
    rid = fields.Integer(description="The repository id.")
    email = fields.String(description="The user's email.")


class AuthorizationParameterSchema(Schema):
    rid = fields.Integer(description="The repository id.")
    email = fields.String(description="The user's email.")


class CreateAuthorizationSchema(Schema):
    email = fields.String(description="The user's email")


class SuccesSchema(Schema):
    result = fields.String(description="Contains a string that informs if the procedure was successful.")
    data = fields.String(description="The content of the response.")


class EmailParameterSchema(Schema):
    email = fields.String(description="The target user's email.")


class IntegerParameterSchema(Schema):
    rid = fields.Integer(description="The target numeric id.")


class AlertParameterSchema(Schema):
    aid = fields.Integer(description="The target numeric id.")


class CreateUser(Schema):
    email = fields.String(description="The new user's email.")
    username = fields.String(description="The new user's username.")
    password = fields.String(description="The new user's password.")


class ConditionSchema(Schema):
    id = fields.Integer(description="The condition id.")
    type = fields.Integer(description="The condition type.")
    content = fields.String(description="The condition content. Meaning may change according to type.")


class RepositorySchema(Schema):
    id = fields.Integer(description="The repository id.")
    name = fields.String(description="The repository name.")
    start = fields.DateTime(description="The start date of the repository.")
    is_active = fields.Boolean(description="True if the repository is active.")
    end = fields.DateTime(description="The end date of the repository")
    owner = fields.Nested(UserSchema)
    spectators = fields.Nested(AuthorizationSchema, many=True)
    conditions = fields.Nested(ConditionSchema, many=True)
    evaluation_mode = fields.Integer(description="The mode with which conditions are evaluated.")


class TweetSchema(Schema):
    snowflake = fields.String(description="The tweet identifier.")
    content = fields.String(description="The content of the tweet.")
    location = fields.String(description="The location (coordinates) from which the tweet was tweeted.")
    place = fields.String(description="The place from which the tweet was tweeted.")
    poster = fields.String(description="The one that created the tweet.")
    insert_time = fields.DateTime(description="The time on which the tweet was captured.")
    post_time = fields.DateTime(description="The time on which the tweet was posted.")
    image_url = fields.String(descritpion="The embedded image urls, separated by |. If there are no images, its None.")
    conditions = fields.Nested(ConditionSchema, many=True)


class CreateRepository(Schema):
    name = fields.String(description="The repository name.")


class RepositoryUpdate(Schema):
    name = fields.String(description="If present, it changes the name of the repository.")
    close = fields.String(description="If present, it closes the repository.")
    open = fields.String(description="If present, it opens the repository.")
    evaluation_mode = fields.Integer(description="If present, it alters the Condition evaluation mode.")


class CreateCondition(Schema):
    type = fields.Integer(description="The condition type.")
    content = fields.String(description="The condition content. Meaning may change according to type.")


class CreateAlert(Schema):
    name = fields.String(description="The name of the alert.")
    limit = fields.Integer(description="The number of tweets in a time window.")
    window_size = fields.Integer(description="The size of the time window.")
    repository_id = fields.Integer(description="The id of the related repository.")
    evaluation_mode = fields.Integer(description="How the conditions have to be evaluated.")
    conditions = fields.Nested(ConditionSchema, many=True)


class Operations(Schema):
    id = fields.Integer(description="The operation id.")
    operation = fields.Integer(description="The type of the operation.")
    is_root = fields.Boolean(description="If true, the operation is the root of the operation tree.")
    node_1 = fields.Nested('self')
    node_2 = fields.Nested('self')
    condition = fields.Nested(ConditionSchema)
    alert_id = fields.Integer(description="The id of the related alert.")


class Notification(Schema):
    id = fields.Integer(description="The notification id.")
    ora = fields.DateTime(description="Muda muda muda.")
    repository_id = fields.Integer(description="The id of the related repository.")


class Alert(Schema):
    id = fields.Integer(description="The alert id.")
    name = fields.String(description="The name of the alert.")
    limit = fields.Integer(description="The number of tweets in a time window.")
    window_size = fields.Integer(description="The size of the time window.")
    repository_id = fields.Integer(description="The id of the related repository.")
    evaluation_mode = fields.Integer(description="How the conditions have to be evaluated.")
    conditions = fields.Nested(ConditionSchema, many=True)
    notifications = fields.Nested(Notification, many=True)


class ConditionParameterSchema(Schema):
    cid = fields.Integer(description="The condition id.")
