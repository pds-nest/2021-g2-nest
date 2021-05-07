import pytest
from flask.testing import Client


# noinspection PyShadowingNames
def test_doa(flask_client: Client, access_token: str):
    response = flask_client.get("/doa", headers={
        "Authorization": f"Bearer {access_token}",
    })
    assert b"If you see this, the server is fine." in response.data
