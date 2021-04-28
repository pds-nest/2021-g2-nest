import unittest
import requests
import json


auth_code = ""


class MyTestCase(unittest.TestCase):
    def test_user_create(self):
        global auth_code

    # testo come admin: successo
    r = requests.post('http://localhost:5000/api/login', json={'email': 'admin@admin.com', 'password': 'password'})
    j = json.loads(r.text)
    assert j['result'] == "success"
    auth_code = j['data']['access_token']

    r = requests.post(f'http://localhost:5000/api/user/create', headers={'authorization': "Bearer " + auth_code},
                      json={'email': 'utente_test@nest.com', 'password': 'password', 'username': 'utente_test'})
    j = json.loads(r.text)
    assert j['result'] == "success"


    # testo come utente normale: fallisce
    auth_code = ""
    r = requests.post('http://localhost:5000/api/login', json={'email': 'utente_test@nest.com', 'password': 'password'})
    j = json.loads(r.text)
    assert j['result'] == "success"
    auth_code = j['data']['access_token']

    r = requests.post(f'http://localhost:5000/api/user/create', headers={'authorization': "Bearer " + auth_code},
                      json={'email': 'utente_test_2@nest.com', 'password': 'password', 'username': 'utente_test_2'})
    j = json.loads(r.text)
    assert j['result'] == "failure"

    print("User_create eseguito correttamente!")


print("Testing del metodo user_create")


if __name__ == '__main__':
    unittest.main()

