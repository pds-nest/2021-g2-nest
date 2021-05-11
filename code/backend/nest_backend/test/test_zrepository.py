from flask.testing import Client

'''A file that contains tests of classes and methods for all the requests concerning an user.'''


class TestRepositoryGetAll:
    def test_get_all_user_repositories(self, flask_client: Client, user_headers):
        r = flask_client.get(f'/api/v1/repositories/', headers=user_headers)
        assert r.json["result"] == "success"
        # assert r.json["data"]["email"] == "admin@admin.com"
        # assert r.json["data"]["isAdmin"] is True

    def test_get_all_admin_repositories(self, flask_client: Client, admin_headers):
        r = flask_client.get(f'/api/v1/repositories/', headers=admin_headers)
        assert r.json["result"] == "success"
        # assert r.json["data"]["email"] == "admin@admin.com"
        # assert r.json["data"]["isAdmin"] is True


