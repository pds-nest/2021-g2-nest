"""OpenAPI v3 Specification"""

# apispec via OpenAPI
from apispec import APISpec
from apispec.ext.marshmallow import MarshmallowPlugin
from apispec_webframeworks.flask import FlaskPlugin
from .api_schemas import *
import pkg_resources

# Create an APISpec
spec = APISpec(
    title="N.E.S.T.",
    version=pkg_resources.get_distribution("nest").version,
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
spec.components.schema("CreateRepository", schema=CreateRepository)
spec.components.schema("CreateCondition", schema=CreateCondition)
spec.components.schema("ConditionParameter", schema=ConditionParameterSchema)
spec.components.schema("AlertParameter", schema=AlertParameterSchema)
spec.components.schema("Alert", schema=Alert)
spec.components.schema("Tweet", schema=TweetSchema)
spec.components.schema("CreateAlert", schema=CreateAlert)
spec.components.security_scheme("jwt", {"type": "http", "scheme": "bearer", "bearerFormat": "JWT"})

# add swagger tags that are used for endpoint annotation
tags = [
    {'name': 'user-related',
     'description': 'User related calls of the API.'
     },
    {'name': 'repository-related',
     'description': 'Repository related calls of the API.'
     },
    {'name': 'condition-related',
     'description': 'Condition related calls of the API.'
     },
    {'name': 'alert-related',
     'description': 'Alert related calls of the API.'
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
