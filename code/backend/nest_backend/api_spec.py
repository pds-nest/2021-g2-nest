"""OpenAPI v3 Specification"""

# apispec via OpenAPI
from apispec import APISpec
from apispec.ext.marshmallow import MarshmallowPlugin
from apispec_webframeworks.flask import FlaskPlugin
from api_schemas import *

# Create an APISpec
spec = APISpec(
    title="N.E.S.T.",
    version="S2-1",
    openapi_version="3.0.2",
    plugins=[FlaskPlugin(), MarshmallowPlugin()],
)


# register schemas with spec
spec.components.schema("Login", schema=LoginSchema)
spec.components.schema("Error", schema=ErrorSchema)
spec.components.schema("I_Login", schema=InputLoginSchema)
spec.components.schema("Success", schema=SuccesSchema)
spec.components.schema("EmailParameter", schema=EmailParameterSchema)
spec.components.schema("CreateUser", schema=CreateUser)
spec.components.schema("Repository", schema=RepositorySchema)
spec.components.schema("IntegerParameter", schema=IntegerParameterSchema)
spec.components.schema("RepositoryUpdate", schema=RepositoryUpdate)
spec.components.security_scheme("jwt", {"type":"http", "scheme":"bearer", "bearerFormat":"JWT"})

# add swagger tags that are used for endpoint annotation
tags = [
    {'name': 'user-related',
     'description': 'User related calls of the API.'
     },
    {'name': 'repository-related',
     'description': 'Repository related calls of the API.'
     },
    {'name': 'admin-only',
     'description': 'Admin only calls of the API.'
     },
    {'name': 'debug',
     'description': 'Debug only calls of the API.'
     },
]

for tag in tags:
    spec.tag(tag)
