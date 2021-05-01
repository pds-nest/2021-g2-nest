import json
import unittest
import requests


class MyTestCase(unittest.TestCase):
    def test_repository_edit(self):
        global auth_code

        # eseguo il login
        r = requests.post('http://localhost:5000/api/v1/login', json={'email': 'admin@admin.com', 'password': 'password'})
        j = json.loads(r.text)
        assert j['result'] == "success"
        auth_code = j['data']['access_token']

        # ritorno le info sulla repo speficicata dopo /repositories
        r = requests.get(f'http://localhost:5000/api/v1/repositories/3', headers={'authorization': "Bearer " + auth_code})
        j = json.loads(r.text)
        assert j['result'] == "success"

        r = requests.delete(f'http://localhost:5000/api/v1/repositories/1', headers={'authorization': "Bearer " + auth_code})
        j = json.loads(r.text)
        assert j['result'] == 'success'




print('Testing del metodo repository_edit')




