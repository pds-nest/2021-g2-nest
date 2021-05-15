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
        assert r.status_code == 400
        assert r.json["result"] == "failure"

    def test_missing_content(self, flask_client: Client, user_headers):
        r = flask_client.post(f'/api/v1/repositories/1/conditions', headers=user_headers,
                              json={"type": 0})
        assert r.status_code == 400
        assert r.json["result"] == "failure"

    def test_for_success(self, flask_client: Client, user_headers):
        r = flask_client.post(f'/api/v1/repositories/1/conditions', headers=user_headers,
                              json={"content": "onlyForTest", "type": 0})
        assert r.status_code == 201
        assert r.json["result"] == "success"

    # test del file condition


class TestOneConditionOfARepository:
    def test_condition_not_found(self, flask_client: Client, user_headers):
        r = flask_client.get(f'/api/v1/conditions/99', headers=user_headers)
        assert r.status_code == 404
        assert r.json["result"] == "failure"

    # test GET
    def test_get_condition(self, flask_client: Client, user_headers):
        r = flask_client.get(f'/api/v1/conditions/3', headers=user_headers)
        assert r.status_code == 200
        assert r.json["result"] == "success"

    # test PATCH
    def test_patch_condition_no_json(self, flask_client: Client, user_headers):
        r = flask_client.patch(f'/api/v1/conditions/3', headers=user_headers)
        assert r.status_code == 400
        assert r.json["result"] == "failure"

    def test_patch_condition_wrong_type(self, flask_client: Client, user_headers):
        r = flask_client.patch(f'/api/v1/conditions/3', headers=user_headers,
                               json={"content": "string", "type": 99})
        assert r.status_code == 400
        assert r.json["result"] == "failure"

    def test_patch_condition_for_success(self, flask_client: Client, user_headers):
        r = flask_client.patch(f'/api/v1/conditions/3', headers=user_headers,
                               json={"content": "patchedForTest", "type": 0})
        assert r.status_code == 204

    # test DELETE
    def test_delete_condition_for_success(self, flask_client: Client, user_headers):
        r = flask_client.delete(f'/api/v1/conditions/3', headers=user_headers)
        assert r.status_code == 204
