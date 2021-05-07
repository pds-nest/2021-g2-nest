from flask.testing import Client


class TestUserGet:
    def test_for_success(self, flask_client: Client, access_token: str):
        r = flask_client.get(f'/api/v1/users/admin@admin.com', headers={'Authorization': f"Bearer {access_token}"})
        assert b'success' in r.data


class TestUserAdd:
    def test_for_success(self, flask_client: Client, access_token: str):
        r = flask_client.post(f'/api/v1/users/', headers={'Authorization': f"Bearer {access_token}"},
                              json={'email': 'utente_test@nest.com', 'password': 'password', 'username': 'utente_test'})
        assert b'success' in r.data


class TestUserDelete:
    def test_for_success(self, flask_client: Client, access_token: str):
        r = flask_client.delete(f'/api/v1/users/utente_test@nest.com', headers={'Authorization': f"Bearer {access_token}"})
        assert b'success' in r.data
