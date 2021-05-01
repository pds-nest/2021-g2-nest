import unittest
import requests
import json


class MyTestCase(unittest.TestCase):
    def test_repository_condition(self):

        # entro come user e recupero le informazioni sulla repo specificata
        r = requests.post('http://localhost:5000/api/v1/login', json={'email': 'utente_test@nest.com', 'password': 'password'})
        j = json.loads(r.text)
        assert j['result'] == "success"
        auth_code = j['data']['access_token']

        r = requests.get(f'http://localhost:5000/api/v1/repositories/1/conditions', headers={'authorization': "Bearer " + auth_code})
        j = json.loads(r.text)  # INTERNAL SERVER ERROR status code 500
        assert j['result'] == "success"


        # entro come user ed aggiungo una condition alla repo specificata
        r = requests.post('http://localhost:5000/api/v1/login', json={'email': 'utente_test@nest.com', 'password': 'password'})
        j = json.loads(r.text)
        assert j['result'] == "success"
        auth_code = j['data']['access_token']

        r = requests.post(f'http://localhost:5000/api/v1/repositories/1/conditions', headers={'authorization': "Bearer " + auth_code},
                          json={'type': 'hashtag', 'content': 'MarioDraghi'})
        j = json.loads(r.text)  # BAD REQUEST erroe 400
        assert j['result'] == "failure"

        for i in j:
            print(j[i])


if __name__ == '__main__':
    unittest.main()
