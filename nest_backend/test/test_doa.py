import pytest
from flask.testing import Client


# noinspection PyShadowingNames
def test_doa(flask_client: Client, admin_headers):
    response = flask_client.get("/doa", headers=admin_headers)
    assert b"If you see this, the server is fine." in response.data
