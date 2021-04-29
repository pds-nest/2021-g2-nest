import requests
import json
import unittest


auth_code = ""


class MyTestCase(unittest.TestCase):
    def test_repository_create(self):
        global auth_code
        # TEST IN POST
        r = requests.post('http://localhost:5000/api/v1/login', json={'email': 'utente_test@nest.com', 'password': 'password'})
        j = json.loads(r.text)
        assert j['result'] == "success"
        auth_code = j['data']['access_token']

        r = requests.post(f'http://localhost:5000/api/v1/repositories/', headers={'authorization': "Bearer " + auth_code},
                          json={})
        j = json.loads(r.text)
        assert j['result'] == "success"

        print("Repository creata correttamente!")

        # TEST IN GET
        r = requests.post('http://localhost:5000/api/v1/login', json={'email': 'utente_test@nest.com', 'password': 'password'})
        j = json.loads(r.text)
        assert j['result'] == "success"
        auth_code = j['data']['access_token']

        r = requests.get(f'http://localhost:5000/api/v1/repositories/', headers={'authorization': "Bearer " + auth_code},
                         json={'owner_id': 'utente_test@nest.com', 'isActive': False})
        j = json.loads(r.text)
        assert j['result'] == "success"

        for i in j:
            print(j[i])


print("Testing del metodo repository_create")

