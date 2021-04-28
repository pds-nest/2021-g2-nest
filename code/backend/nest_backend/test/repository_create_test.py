import requests
import json
import unittest


auth_code = ""


class MyTestCase(unittest.TestCase):
    def test_repository_create(self):
        global auth_code

        r = requests.post('http://localhost:5000/api/login', json={'email': 'utente13@nest.com', 'password': ''})
        j = json.loads(r.text)
        assert j['result'] == "success"
        auth_code = j['data']['access_token']

        r = requests.post(f'http://localhost:5000/api/repository/create', headers={'authorization': "Bearer " + auth_code},
                          json={'name': 'prova3', 'owner_id': 'email'})
        j = json.loads(r.text)
        assert j['result'] == "success"

        print("Repository_create eseguito correttamente!")


print("Testing del metodo repository_create")

