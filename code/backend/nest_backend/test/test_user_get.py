from flask.testing import Client

# test get user admin


def test_user_get(flask_client: Client, access_token: str):
    r = flask_client.get(f'/api/v1/users/admin@admin.com', headers={'Authorization': f"Bearer {access_token}"})
    assert b'success' in r.data

