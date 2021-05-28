from flask.testing import Client

'''A file that contains tests of classes and methods for all the requests concerning an user.'''


class TestUserGet:
    def test_admin_user(self, flask_client: Client, admin_headers):
        r = flask_client.get(f'/api/v1/users/admin@admin.com', headers=admin_headers)
        assert r.json["result"] == "success"
        assert r.json["data"]["email"] == "admin@admin.com"
        assert r.json["data"]["isAdmin"] is True
        assert r.json["data"]["username"] == "admin"

    def test_non_existing_user(self, flask_client: Client, admin_headers):
        r = flask_client.get(f'/api/v1/users/ciccio@dev.com', headers=admin_headers)
        assert r.json["result"] == "failure"
        assert r.json["msg"] == "Could not locate the user."


# ritorna i dati di tutti gli utenti registrati
class TestUserGetAll:
    def test_for_success(self, flask_client: Client, admin_headers):
        r = flask_client.get(f'/api/v1/users/', headers=admin_headers)
        assert r.json["result"] == "success"

    def test_for_failure(self, flask_client: Client, user_headers):
        r = flask_client.patch(f'/api/v1/users/', headers=user_headers)
        assert r.json["result"] == "failure"


class TestUserAdd:
    def test_valid_user(self, flask_client: Client, admin_headers):
        r = flask_client.post(f'/api/v1/users/', headers=admin_headers, json={
            'email': 'utente1_test@nest.com',
            'password': 'password',
            'username': 'utente_test'
        })
        assert r.json["result"] == "success"

    def test_existing_user(self, flask_client: Client, user_headers):
        r = flask_client.post(f'/api/v1/users/', headers=user_headers, json={
            'email': 'utente_test@nest.com',
            'password': 'password',
            'username': 'utente_test'
        })
        assert r.json["result"] == "failure"


class TestUserDelete:
    def test_valid_user(self, flask_client: Client, admin_headers):
        r = flask_client.delete(f'/api/v1/users/utente1_test@nest.com', headers=admin_headers)
        assert r.status_code == 204

    # the admin tries to commit suicide
    def test_himself(self, flask_client: Client, admin_headers):
        r = flask_client.delete(f'/api/v1/users/admin@admin.com', headers=admin_headers)
        assert r.json["result"] == "failure"


class TestUserPatch:
    def test_for_success(self, flask_client: Client, admin_headers):
        r = flask_client.patch(f'/api/v1/users/admin@admin.com', headers=admin_headers, json={
            'username': 'admin_patched'
        })
        assert r.json["result"] == "success"

    def test_not_authorized(self, flask_client: Client, user_headers):
        r = flask_client.patch(f'/api/v1/users/admin@admin.com', headers=user_headers, json={
            'username': 'admin_patched'
        })
        assert r.json["result"] == "failure"
