from flask.testing import Client

'''A file that contains tests classes and methods for all the requests concerning Tweets.'''
# TODO capire come passare i Tweet nell'URL


class TestTweetGet:
    def test_for_success(self, flask_client: Client, user_headers):
        r = flask_client.get(f'/api/v1/repositories/1/tweets/', headers=user_headers)
        assert r.status_code == 200
        assert r.json["result"] == "success"

    def test_repository_not_found(self, flask_client: Client, user_headers):
        r = flask_client.get(f'/api/v1/repositories/99/tweets/', headers=user_headers)
        assert r.status_code == 404
        assert r.json["result"] == "failure"

    def test_user_wrong_owner(self, flask_client: Client, user_headers):
        r = flask_client.get(f'/api/v1/repositories/2/tweets/', headers=user_headers)
        assert r.status_code == 403
        assert r.json["result"] == "failure"

    def test_user_not_logged(self, flask_client: Client, ):
        r = flask_client.get(f'/api/v1/repositories/2/tweets/')
        assert r.status_code == 401
