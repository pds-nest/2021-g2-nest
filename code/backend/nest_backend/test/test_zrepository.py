from flask.testing import Client

'''A file that contains tests of classes and methods for all the requests concerning an user.'''


class TestRepositoryGetAll:
    def test_get_all_user_repositories(self, flask_client: Client, user_headers):
        r = flask_client.get(f'/api/v1/repositories/', headers=user_headers,
                             json={'owner_id': 'utente_test@nest.com', 'isActive': False})
        assert r.json["result"] == "success"
        # assert r.json["data"]["owner"] == "utente_test@nest.com"
        # assert r.json["data"]["isAdmin"] is not True

    def test_get_all_admin_repositories(self, flask_client: Client, admin_headers):
        r = flask_client.get(f'/api/v1/repositories/', headers=admin_headers,
                             json={'owner_id': 'admin@admin.com', 'isActive': False})
        assert r.json["result"] == "success"
        # assert r.json["data"]["owner"] == "admin@admin.com"
        # assert r.json["data"]["isAdmin"] is True


class TestRepositoryAdd:
    def test_for_success(self, flask_client: Client, user_headers):
        r = flask_client.post(f'/api/v1/repositories/', headers=user_headers, json={
            'conditions': [
                {
                    'content': 'PdS2021',
                    'id': 0,
                    'type': 0
                }
            ],
            'evaluation_mode': 0,
            'name': 'repo_test',
            'is_active': True
        })
        assert r.json["result"] == "success"
        assert r.json["data"]["is_active"] is True

    # non vengono passate le condizioni necessarie, in questo caso il nome della repository
    def test_for_failure(self, flask_client: Client, user_headers):
        r = flask_client.post(f'/api/v1/repositories/', headers=user_headers, json={
            'conditions': [
                {
                    'content': 'PdS2021',
                    'id': 0,
                    'type': 0
                }
            ],
            'evaluation_mode': 0,
            'is_active': True
        })
        assert r.json["msg"] == "Missing arguments."
        assert r.json["result"] == "failure"

    # viene passato un campo evaluation_mode con valore non previsto dall'enum
    def test_wrong_evaluation_mode(self, flask_client: Client, user_headers):
        r = flask_client.post(f'/api/v1/repositories/', headers=user_headers, json={
            'conditions': [
                {
                    'content': 'PdS2021',
                    'id': 0,
                    'type': 0
                }
            ],
            'evaluation_mode': 99,
            'name': 'repo_test',
            'is_active': True
        })
        assert r.json["result"] == "failure"

    # viene passato un campo type con valore non previsto dall'enum
    def test_wrong_condition(self, flask_client: Client, user_headers):
        r = flask_client.post(f'/api/v1/repositories/', headers=user_headers, json={
            'conditions': [
                {
                    'content': 'PdS2021',
                    'id': 0,
                    'type': 99
                }
            ],
            'evaluation_mode': 2,
            'name': 'repo_test',
            'is_active': True
        })
        assert r.json["result"] == "failure"

'''
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
