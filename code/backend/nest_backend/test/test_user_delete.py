from flask.testing import Client

# test delete user utente_test


def test_user_delete(flask_client: Client, access_token: str):
    r = flask_client.delete(f'/api/v1/users/utente_test@nest.com', headers={'Authorization': f"Bearer {access_token}"})
    assert b'success' in r.data
