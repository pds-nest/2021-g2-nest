from flask.testing import Client


class TestUserGet:
    def test_for_success(self, flask_client: Client, admin_headers):
        r = flask_client.get(f'/api/v1/users/admin@admin.com', headers=admin_headers)
        assert b'success' in r.data


class TestUserAdd:
    def test_for_success(self, flask_client: Client, admin_headers):
        r = flask_client.post(f'/api/v1/users/', headers=admin_headers,
                              json={'email': 'utente_test@nest.com', 'password': 'password', 'username': 'utente_test'})
        assert b'success' in r.data


class TestUserDelete:
    def test_for_success(self, flask_client: Client, admin_headers):
        r = flask_client.delete(f'/api/v1/users/utente_test@nest.com', headers=admin_headers)
        assert b'success' in r.data
