import json
import unittest
import requests


class MyTestCase(unittest.TestCase):
    def test_repository_edit(self):
        global auth_code

        r = requests.post('http://localhost:5000/api/login', json={'email': 'admin@admin.com', 'password': 'password'})
        j = json.loads(r.text)
        assert j['result'] == "success"
        auth_code = j['data']['access_token']

        r = requests.put(f'http://localhost:5000/api/repository/edit', headers={'authorization': "Bearer " + auth_code},
                         json={'id': '1', 'name': 'newname'})
        j = json.loads(r.text)
        assert j['result'] == "success"

        print('Repository_edit eseguito correttamente!')


print('Testing del metodo repository_edit')




