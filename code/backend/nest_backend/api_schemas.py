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


class SuccesSchema(Schema):
    result = fields.String(description="Contains a string that informs if the procedure was successful.")
    data = fields.String(description="The content of the response.")


class EmailParameterSchema(Schema):
    email = fields.String(description="The target user's email.")


class IntegerParameterSchema(Schema):
    id = fields.Integer(description="The target numeric id.")


class CreateUser(Schema):
    email = fields.String(description="The new user's email.")
    username = fields.String(description="The new user's username.")
    password = fields.String(description="The new user's password.")


class RepositorySchema(Schema):
    id = fields.Integer(description="The repository id.")
    name = fields.String(description="The repository name.")
    start = fields.DateTime(description="The start date of the repository.")
    isActive = fields.Boolean(description="True if the repository is active.")
    end = fields.DateTime(description="The end date of the repository")
    owner = fields.Nested(UserSchema)


class RepositoryUpdate(Schema):
    name = fields.String(description="If present, it changes the name of the repository.")
    close = fields.String(description="If present, it closes the repository.")
    open = fields.String(description="If present, it opens the repository.")