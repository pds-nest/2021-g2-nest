from flask.testing import Client

# test add user utente_test


def test_user_add(flask_client: Client, access_token: str):
    r = flask_client.post(f'/api/v1/users/', headers={'Authorization': f"Bearer {access_token}"},
                          json={'email': 'utente_test@nest.com', 'password': 'password', 'username': 'utente_test'})
    assert b'success' in r.data
