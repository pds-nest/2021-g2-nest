from flask.testing import Client

'''A file that contains tests of classes and methods for all the requests concerning an user.'''


class TestRepositoryAdd:
    # creo un repository
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
        assert r.status_code == 201
        assert r.json["result"] == "success"
        assert r.json["data"]["is_active"] is True

    # ne creo un altro come admin
    def test_for_success_admin(self, flask_client: Client, admin_headers):
        r = flask_client.post(f'/api/v1/repositories/', headers=admin_headers, json={
            'conditions': [
                {
                    'content': 'PdS2021',
                    'id': 0,
                    'type': 0
                }
            ],
            'evaluation_mode': 0,
            'name': 'repo_admin',
            'is_active': True
        })
        assert r.status_code == 201
        assert r.json["result"] == "success"
        assert r.json["data"]["is_active"] is True

    # non vengono passate le condizioni necessarie, in questo caso il nome della repository
    def test_no_name(self, flask_client: Client, user_headers):
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
        assert r.status_code == 400
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
        assert r.status_code == 400
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
        assert r.status_code == 400
        assert r.json["result"] == "failure"


class TestRepositoryGetAll:
    def test_get_all_user_repositories(self, flask_client: Client, user_headers):
        r = flask_client.get(f'/api/v1/repositories/', headers=user_headers,
                             json={
                                 'owner_id': 'utente_test@nest.com',
                                 'isActive': False
                             })
        assert r.status_code == 200
        assert r.json["result"] == "success"

    def test_get_all_admin_repositories(self, flask_client: Client, admin_headers):
        r = flask_client.get(f'/api/v1/repositories/', headers=admin_headers,
                             json={
                                 'owner_id': 'admin@admin.com',
                                 'isActive': False
                             })
        assert r.status_code == 200
        assert r.json["result"] == "success"

    def test_user_not_logged(self, flask_client: Client):
        r = flask_client.get(f'/api/v1/repositories/',
                             json={
                                 'owner_id': 'utente_test@nest.com',
                                 'isActive': False})
        assert r.status_code == 401


class TestRepositoryGet:
    def test_get_existing_repository(self, flask_client: Client, user_headers):
        r = flask_client.get(f'/api/v1/repositories/1', headers=user_headers)
        assert r.status_code == 200
        assert r.json["result"] == "success"

    def test_get_non_existing_repository(self, flask_client: Client, admin_headers):
        r = flask_client.get(f'/api/v1/repositories/99', headers=admin_headers)
        assert r.status_code == 404
        assert r.json["result"] == "failure"

    def test_user__not_logged(self, flask_client: Client, ):
        r = flask_client.get(f'/api/v1/repositories/1')
        assert r.status_code == 401


class TestRepositoryPatch:
    def test_wrong_owner(self, flask_client: Client, admin_headers):
        r = flask_client.patch(f'/api/v1/repositories/1', headers=admin_headers)
        assert r.status_code == 403
        assert r.json["result"] == "failure"

    def test_user_not_logged(self, flask_client: Client):
        r = flask_client.patch(f'/api/v1/repositories/1')
        assert r.status_code == 401

    def test_repository_not_found(self, flask_client: Client, user_headers):
        r = flask_client.patch(f'/api/v1/repositories/99', headers=user_headers)
        assert r.status_code == 404
        assert r.json["result"] == "failure"

    def test_for_success(self, flask_client: Client, admin_headers):
        r = flask_client.patch(f'/api/v1/repositories/2', headers=admin_headers, json={
                    'conditions': [
                        {
                            'content': 'calcio',
                            'id': 0,
                            'type': 0
                        }
                    ],
                    "evaluation_mode": 0,
                    "id": 0,
                    "is_active": "false",
                    "name": "nuovo_nome",


                               })
        assert r.status_code == 204
'''
    def test_unknown_type(self, flask_client: Client, admin_headers):
        r = flask_client.patch(f'/api/v1/repositories/1', headers=admin_headers,
                               json={
                                   "name": "string",
                                   "close": "string",
                                   "open": "string",
                                   "evaluation_mode": 99
                               })
        assert r.status_code == 400
        assert r.json["result"] == "failure" '''




class TestRepositoryDelete:
    def test_wrong_owner(self, flask_client: Client, user_headers):
        r = flask_client.delete(f'/api/v1/repositories/2', headers=user_headers)
        assert r.status_code == 403
        assert r.json["result"] == "failure"

    # TODO: testare la condizione di uscita con errore perche ci sono delle dipendenze

    def test_for_success(self, flask_client: Client, admin_headers):
        r = flask_client.delete(f'/api/v1/repositories/2', headers=admin_headers)
        assert r.status_code == 204

    def test_user_not_logged(self, flask_client: Client):
        r = flask_client.delete(f'/api/v1/repositories/2')
        assert r.status_code == 401

    def test_repository_not_found(self, flask_client: Client, user_headers):
        r = flask_client.delete(f'/api/v1/repositories/99', headers=user_headers)
        assert r.status_code == 404
        assert r.json["result"] == "failure"


class TestRepositoryPut:

    def test_user_not_logged(self, flask_client: Client):
        r = flask_client.put(f'/api/v1/repositories/1')
        assert r.status_code == 401

    def test_bad_request(self, flask_client: Client, user_headers):
        r = flask_client.put(f'/api/v1/repositories/1', headers=user_headers,
            json={
                "name": "string",
                "close": "string",
                "open": "string",
                "evaluation_mode": 0
            })
        assert r.status_code == 400
        assert r.json["result"] == "failure"

    def test_repository_not_found(self, flask_client: Client, user_headers):
        r = flask_client.put(f'/api/v1/repositories/99', headers=user_headers)
        assert r.status_code == 404
        assert r.json["result"] == "failure"

    def test_for_success(self, flask_client: Client, admin_headers):
        r = flask_client.put(f'/api/v1/repositories/1', headers=admin_headers, json={
            "conditions": [
                {
                    "content": "string",
                    "id": 0,
                    "type": 0
                }
            ],
            "end": "2021-05-14T12:12:29.827Z",
            "evaluation_mode": 0,
            "id": 0,
            "is_active": True,
            "name": "string",
            "owner": {
                "email": "string",
                "isAdmin": True,
                "username": "string"
            },
            "spectators": [],
            "start": "2021-05-14T12:12:29.827Z"
        })
        assert r.status_code == 200
