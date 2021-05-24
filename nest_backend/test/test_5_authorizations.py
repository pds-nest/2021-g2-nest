from flask.testing import Client

'''A file that contains tests classes and methods for all the requests concerning authorizations .'''


class TestAuthozitazionsGet:
    def test_for_success(self, flask_client: Client, user_headers):
        r = flask_client.get('/api/v1/repositories/1/authorizations/', headers=user_headers)
        assert r.status_code == 200
        assert r.json["result"] == "success"

    def test_get_non_existing_repository(self, flask_client: Client, admin_headers):
        r = flask_client.get('/api/v1/repositories/99/authorizations/', headers=admin_headers)
        assert r.status_code == 404
        assert r.json["result"] == "failure"

    def test_wrong_owner(self, flask_client: Client, admin_headers):
        r = flask_client.get(f'/api/v1/repositories/1/authorizations/', headers=admin_headers)
        assert r.status_code == 403
        assert r.json["result"] == "failure"
