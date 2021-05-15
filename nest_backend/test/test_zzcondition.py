from flask.testing import Client

'''A file that contains tests of classes and methods for all the requests concerning an user.'''


# test del file repository_conditions


class TestConditionGetAllOfARepository:
    def test_repository_not_found(self, flask_client: Client, user_headers):
        r = flask_client.get(f'/api/v1/repositories/99/conditions', headers=user_headers)
        assert r.status_code == 404
        assert r.json["result"] == "failure"

    def test__unauthorized_repository(self, flask_client: Client, admin_headers):
        r = flask_client.get(f'/api/v1/repositories/1/conditions', headers=admin_headers)
        assert r.status_code == 403
        assert r.json["result"] == "failure"

    def test_get_all_conditions_of_a_repository(self, flask_client: Client, user_headers):
        r = flask_client.get(f'/api/v1/repositories/1/conditions', headers=user_headers)
        assert r.status_code == 200
        assert r.json["result"] == "success"


class TestConditionPost:
    def test_missing_type(self, flask_client: Client, user_headers):
        r = flask_client.post(f'/api/v1/repositories/1/conditions', headers=user_headers,
                              json={})
        assert r.status_code == 400
        assert r.json["result"] == "failure"

    def test_wrong_type(self, flask_client: Client, user_headers):
        r = flask_client.post(f'/api/v1/repositories/1/conditions', headers=user_headers,
                              json={"content": "string", "type": 99})
        assert r.status_code == 400 # ottengo 500
        assert r.json["result"] == "failure"

    def test_missing_content(self, flask_client: Client, user_headers):
        r = flask_client.post(f'/api/v1/repositories/1/conditions', headers=user_headers,
                              json={"type": 0})
        assert r.status_code == 400 # ottengo 500
        assert r.json["result"] == "failure"

    def test_for_success(self, flask_client: Client, user_headers):
        r = flask_client.post(f'/api/v1/repositories/1/conditions', headers=user_headers,
                              json={"content": "string", "type": 0})
        assert r.status_code == 201
        assert r.json["result"] == "success"

    # test del file condition


class TestConditionGetOneOfARepository:
    def test_condition_not_found(selfself, flask_client: Client, user_headers):
        r = flask_client.get(f'/api/v1/conditions/999', headers=user_headers)
        assert r.status_code == 404
        assert r.json["result"] == "failure"

    # TODO: testare  GET

    # TODO: testare PATCH

    # TODO: testare DELETE
