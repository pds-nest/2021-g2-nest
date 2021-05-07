import pytest
from flask.testing import Client
from nest_backend.test.fixtures import flask_client


# noinspection PyShadowingNames
def test_doa(flask_client: Client):
    response = flask_client.get("/doa")
    assert b"If you see this, the server is fine." in response.data
