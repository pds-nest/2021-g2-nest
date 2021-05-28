import pytest
from flask.testing import Client


# noinspection PyShadowingNames
def test_doa(flask_client: Client, admin_headers):
    response = flask_client.get("/doa", headers=admin_headers)
    assert b"If you see this, the server is fine." in response.data


def test_sq_told_me_to_do_this(flask_client: Client, user_headers):
    response = flask_client.post("/doa", headers=user_headers)
    assert b"Hello there." in response.data
