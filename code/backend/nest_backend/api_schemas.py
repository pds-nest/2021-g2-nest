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


class CreateUser(Schema):
    email = fields.String(description="The new user's email.")
    username = fields.String(description="The new user's username.")
    password = fields.String(description="The new user's password.")