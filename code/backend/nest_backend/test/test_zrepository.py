from flask.testing import Client

'''A file that contains tests of classes and methods for all the requests concerning an user.'''


class TestRepositoryGetAll:
    def test_get_all_user_repositories(self, flask_client: Client, user_headers):
        r = flask_client.get(f'/api/v1/repositories/', headers=user_headers,
                             json={'owner_id': 'utente_test@nest.com', 'isActive': False})
        assert r.json["result"] == "success"
        # assert r.json["data"]["email"] == "admin@admin.com"
        # assert r.json["data"]["isAdmin"] is True

    def test_get_all_admin_repositories(self, flask_client: Client, admin_headers):
        r = flask_client.get(f'/api/v1/repositories/', headers=admin_headers,
                             json={'owner_id': 'admin@admin.com', 'isActive': False})
        assert r.json["result"] == "success"
        # assert r.json["data"]["email"] == "admin@admin.com"
        # assert r.json["data"]["isAdmin"] is True


'''    
    def test_non_existing_user(self, flask_client: Client, admin_headers):
        r = flask_client.get(f'/api/v1/users/ciccio@dev.com', headers=admin_headers)
        assert r.json["result"] == "failure"
        assert r.json["msg"] == "Could not locate the user."

class TestUserAdd:
    def test_for_success(self, flask_client: Client, admin_headers):
        r = flask_client.post(f'/api/v1/users/', headers=admin_headers, json={
            'email': 'utente1_test@nest.com',
            'password': 'password',
            'username': 'utente_test'
        })
        assert b'success' in r.data

    def test_for_failure(self, flask_client: Client, user_headers):
        r = flask_client.post(f'/api/v1/users/', headers=user_headers, json={
            'email': 'utente_test@nest.com',
            'password': 'password',
            'username': 'utente_test'
        })
        assert b'failure' in r.data


class TestUserDelete:
    def test_for_success(self, flask_client: Client, admin_headers):
        r = flask_client.delete(f'/api/v1/users/utente_test@nest.com', headers=admin_headers)
        assert b'success' in r.data

    # the admin tries to commit suicide
    def test_for_failure(self, flask_client: Client, admin_headers):
        r = flask_client.delete(f'/api/v1/users/admin@admin.com', headers=admin_headers)
        assert b'failure' in r.data


class TestUserPatch:
    def test_for_success(self, flask_client: Client, admin_headers):
        r = flask_client.patch(f'/api/v1/users/admin@admin.com', headers=admin_headers, json={
            'username': 'admin_patched'
        })
        assert b'success' in r.data

    # FIXME AssertionError in flask_client at line 63. Il test non riesce ad andare a buon fine
    def test_for_failure(self, flask_client: Client, user_headers):
        r = flask_client.patch(f'/api/v1/users/admin@admin.com', headers=user_headers, json={
            'username': 'admin_patched'
        })
        assert b'failure' in r.data

'''
