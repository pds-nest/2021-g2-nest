import json
import unittest
import requests


class MyTestCase(unittest.TestCase):
    def test_repository_edit(self):
        global auth_code

        # eseguo il login
        r = requests.post('http://localhost:5000/api/v1/login', json={'email': 'utente_test@nest.com', 'password': 'password'})
        j = json.loads(r.text)
        assert j['result'] == "success"
        auth_code = j['data']['access_token']

        # ritorno le info sulla repository speficicata
        r = requests.get(f'http://localhost:5000/api/v1/repositories/1', headers={'authorization': "Bearer " + auth_code})
        j = json.loads(r.text)
        assert j['result'] == "success"

        # cancello la repository specificata
        r = requests.delete(f'http://localhost:5000/api/v1/repositories/1', headers={'authorization': "Bearer " + auth_code})
        j = json.loads(r.text)
        assert j['result'] == "success"

        # modifico il nome e lo stato della repository specificata 
        r = requests.patch(f'http://localhost:5000/api/v1/repositories/1', headers={'authorization': "Bearer " + auth_code},
                           json={'name': 'newname', 'open': True})
        j = json.loads(r.text)
        assert j['result'] == "success"


print('Testing del metodo repository_edit')




