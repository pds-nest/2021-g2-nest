from flask.testing import Client

'''A file that contains tests of classes and methods for all the requests concerning an user.'''


# test del file repository_alerts


class TestAlertsGetAllOfARepository:
    def test_repository_not_found(self, flask_client: Client, user_headers):
        r = flask_client.get(f'/api/v1/repositories/99/alerts/', headers=user_headers)
        assert r.status_code == 404
        assert r.json["result"] == "failure"

    def test_unauthorized_repository(self, flask_client: Client, admin_headers):
        r = flask_client.get(f'/api/v1/repositories/1/alerts/', headers=admin_headers)
        assert r.status_code == 403
        assert r.json["result"] == "failure"

    def test_get_all_alerts_of_a_repository(self, flask_client: Client, user_headers):
        r = flask_client.get(f'/api/v1/repositories/1/alerts/', headers=user_headers)
        assert r.status_code == 200
        assert r.json["result"] == "success"


class TestAlertPost:
    def test_missing_name(self, flask_client: Client, user_headers):
        r = flask_client.post(f'/api/v1/repositories/1/alerts/', headers=user_headers,
                              json={})
        assert r.status_code == 400
        assert r.json["result"] == "failure"

    def test_missing_limit(self, flask_client: Client, user_headers):
        r = flask_client.post(f'/api/v1/repositories/1/alerts/', headers=user_headers,
                              json={"name": "testalert"})
        assert r.status_code == 400
        assert r.json["result"] == "failure"

    def test_missing_window_size(self, flask_client: Client, user_headers):
        r = flask_client.post(f'/api/v1/repositories/1/alerts/', headers=user_headers,
                              json={"name": "testalert", "limit": "1"})
        assert r.status_code == 400
        assert r.json["result"] == "failure"

    def test_missing_evaluation_mode(self, flask_client: Client, user_headers):
        r = flask_client.post(f'/api/v1/repositories/1/alerts/', headers=user_headers,
                              json={
                                  "conditions": [
                                      {
                                          "content": "pds2021",
                                          "id": 0,
                                          "type": 0
                                      }
                                  ],
                                  "XXXevaluation_modeXXX": 0,
                                  "limit": 0,
                                  "name": "pds",
                                  "repository_id": 1,
                                  "window_size": 0
                              })
        assert r.status_code == 400
        assert r.json["result"] == "failure"

    def test_wrong_evaluation_mode(self, flask_client: Client, user_headers):
        r = flask_client.post(f'/api/v1/repositories/1/alerts/', headers=user_headers,
                              json={
                                  "conditions": [
                                      {
                                          "content": "pds2021",
                                          "id": 0,
                                          "type": 0
                                      }
                                  ],
                                  "evaluation_mode": 99,
                                  "limit": 0,
                                  "name": "pds",
                                  "repository_id": 1,
                                  "window_size": 0
                              })
        assert r.status_code == 400
        assert r.json["result"] == "failure"

    def test_missing_type(self, flask_client: Client, user_headers):
        r = flask_client.post(f'/api/v1/repositories/1/alerts/', headers=user_headers,
                              json={
                                  "conditions": [
                                      {
                                          "content": "pds2021",
                                          "id": 0,
                                          "XXXtypeXXX": 99
                                      }
                                  ],
                                  "evaluation_mode": 0,
                                  "limit": 0,
                                  "name": "pds",
                                  "repository_id": 1,
                                  "window_size": 0
                              })
        assert r.status_code == 400
        assert r.json["result"] == "failure"

    def test_wrong_type(self, flask_client: Client, user_headers):
        r = flask_client.post(f'/api/v1/repositories/1/alerts/', headers=user_headers,
                              json={
                                  "conditions": [
                                      {
                                          "content": "pds2021",
                                          "id": 0,
                                          "type": 99
                                      }
                                  ],
                                  "evaluation_mode": 0,
                                  "limit": 0,
                                  "name": "pds",
                                  "repository_id": 1,
                                  "window_size": 0
                              })
        assert r.status_code == 400
        assert r.json["result"] == "failure"

    def test_missing_content(self, flask_client: Client, user_headers):
        r = flask_client.post(f'/api/v1/repositories/1/alerts/', headers=user_headers,
                              json={
                                  "conditions": [
                                      {
                                          "XXXcontentXXX": "pds2021",
                                          "id": 0,
                                          "type": 0
                                      }
                                  ],
                                  "evaluation_mode": 0,
                                  "limit": 0,
                                  "name": "pds",
                                  "repository_id": 1,
                                  "window_size": 0
                              })
        assert r.status_code == 400
        assert r.json["result"] == "failure"

    def test_for_success(self, flask_client: Client, user_headers):
        r = flask_client.post(f'/api/v1/repositories/1/alerts/', headers=user_headers,
                              json={
                                      "conditions": [
                                        {
                                          "content": "pds2021",
                                          "id": 0,
                                          "type": 0
                                        }
                                      ],
                                      "evaluation_mode": 0,
                                      "limit": 0,
                                      "name": "pds",
                                      "repository_id": 1,
                                      "window_size": 0
                                    })
        assert r.status_code == 201
        assert r.json["result"] == "success"


class TestAlertGet:
    def test_alert_not_found(self, flask_client: Client, user_headers):
        r = flask_client.get(f'/api/v1/alert/99', headers=user_headers)
        assert r.status_code == 404
        assert r.json["result"] == "failure"

    # test GET
    def test_get_alert(self, flask_client: Client, user_headers):
        r = flask_client.get(f'/api/v1/alert/1', headers=user_headers)
        assert r.status_code == 200
        assert r.json["result"] == "success"


class TestAlertPatch:
    def test_patch_alert_no_json(self, flask_client: Client, user_headers):
        r = flask_client.patch(f'/api/v1/alert/1', headers=user_headers)
        assert r.status_code == 400
        assert r.json["result"] == "failure"

    def test_patch_alert_wrong_evaluation_mode(self, flask_client: Client, user_headers):
        r = flask_client.patch(f'/api/v1/alert/1', headers=user_headers,
                               json={"evaluation_mode": 99})
        assert r.status_code == 400
        assert r.json["result"] == "failure"

    def test_patch_alert_for_success(self, flask_client: Client, user_headers):
        r = flask_client.patch(f'/api/v1/alert/1', headers=user_headers,
                               json={
                                       "evaluation_mode": 1,
                                       "limit": 1,
                                       "name": "new_name",
                                       "window_size": 1
                                   })
        assert r.status_code == 200
        assert r.json["result"] == "success"


class TestAlertPut:
    def test_for_success(self, flask_client: Client, user_headers):
        r = flask_client.put(f'/api/v1/alert/2', headers=user_headers, json={
            "conditions": [
                {
                    "content": "string",
                    "id": 0,
                    "type": 0
                }
            ],
            "evaluation_mode": 0,
            "id": 0,
            "limit": 0,
            "name": "string",
            "notifications": [
                {
                    "id": 0,
                    "ora": "2021-05-29T11:32:38.664Z",
                    "repository_id": 0
                }
            ],
            "repository_id": 0,
            "window_size": 0
        })
        assert r.status_code == 200

    def test_put_alert_no_json(self, flask_client: Client, user_headers):
        r = flask_client.put(f'/api/v1/alert/2', headers=user_headers)
        assert r.status_code == 400
        assert r.json["result"] == "failure"

    def test_put_alert_wrong_evaluation_mode(self, flask_client: Client, user_headers):
        r = flask_client.put(f'/api/v1/alert/2', headers=user_headers,
                             json={
                                 "conditions": [
                                     {
                                         "content": "string",
                                         "id": 0,
                                         "type": 0
                                     }
                                 ],
                                 "evaluation_mode": 99,
                                 "id": 0,
                                 "limit": 0,
                                 "name": "string",
                                 "notifications": [
                                     {
                                         "id": 0,
                                         "ora": "2021-05-28T18:23:22.324Z",
                                         "repository_id": 0
                                     }
                                 ],
                                 "repository_id": 0,
                                 "window_size": 0
                             })
        assert r.status_code == 400
        assert r.json["result"] == "failure"

    def test_put_alert_empty_conditions_type(self, flask_client: Client, user_headers):
        r = flask_client.put(f'/api/v1/alert/2', headers=user_headers,
                             json={
                                 "conditions": [
                                     {
                                         "content": "string",
                                         "id": 0
                                     }
                                 ],
                                 "evaluation_mode": 0,
                                 "id": 0,
                                 "limit": 0,
                                 "name": "string",
                                 "notifications": [
                                     {
                                         "id": 0,
                                         "ora": "2021-05-28T18:23:22.324Z",
                                         "repository_id": 0
                                     }
                                 ],
                                 "repository_id": 0,
                                 "window_size": 0
                             })
        assert r.status_code == 400
        assert r.json["result"] == "failure"

    def test_put_alert_wrong_conditions_type(self, flask_client: Client, user_headers):
        r = flask_client.put(f'/api/v1/alert/2', headers=user_headers,
                             json={
                                 "conditions": [
                                     {
                                         "content": "string",
                                         "id": 0,
                                         "type": 99
                                     }
                                 ],
                                 "evaluation_mode": 0,
                                 "id": 0,
                                 "limit": 0,
                                 "name": "string",
                                 "notifications": [
                                     {
                                         "id": 0,
                                         "ora": "2021-05-28T18:23:22.324Z",
                                         "repository_id": 0
                                     }
                                 ],
                                 "repository_id": 0,
                                 "window_size": 0
                             })
        assert r.status_code == 400
        assert r.json["result"] == "failure"

    def test_put_alert_missing_conditions_content(self, flask_client: Client, user_headers):
        r = flask_client.put(f'/api/v1/alert/2', headers=user_headers,
                             json={
                                 "conditions": [
                                     {
                                         "id": 0,
                                         "type": 99
                                     }
                                 ],
                                 "evaluation_mode": 0,
                                 "id": 0,
                                 "limit": 0,
                                 "name": "string",
                                 "notifications": [
                                     {
                                         "id": 0,
                                         "ora": "2021-05-28T18:23:22.324Z",
                                         "repository_id": 0
                                     }
                                 ],
                                 "repository_id": 0,
                                 "window_size": 0
                             })
        assert r.status_code == 400
        assert r.json["result"] == "failure"


class TestAlertDelete:
    def test_delete_alert_for_success(self, flask_client: Client, user_headers):
        r = flask_client.delete(f'/api/v1/alert/1', headers=user_headers)
        assert r.status_code == 204

    def test_error_500(self, flask_client: Client, user_headers):
        r = flask_client.delete(f'/api/v99/alert/1', headers=user_headers)
        assert r.status_code == 500
