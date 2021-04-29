import unittest
import requests
import json


auth_code = ""


class MyTestCase(unittest.TestCase):
    def test_user_create(self):
        global auth_code
    # TEST IN POST
    # User autenticato come Admin: successo
    r = requests.post('http://localhost:5000/api/v1/login', json={'email': 'admin@admin.com', 'password': 'password'})
    j = json.loads(r.text)
    assert j['result'] == "success"
    auth_code = j['data']['access_token']

    r = requests.post(f'http://localhost:5000/api/v1/users', headers={'authorization': "Bearer " + auth_code},
                      json={'email': 'utente_test@nest.com', 'password': 'password', 'username': 'utente_test'})
    j = json.loads(r.text)
    assert j['result'] == "success"
    print("User creato correttamente!")


    # User autenticato come non-Admin: fallisce
    auth_code = ""
    r = requests.post('http://localhost:5000/api/v1/login', json={'email': 'utente20@nest.com', 'password': 'password'})
    j = json.loads(r.text)
    assert j['result'] == "success"
    auth_code = j['data']['access_token']

    r = requests.post(f'http://localhost:5000/api/v1/users', headers={'authorization': "Bearer " + auth_code},
                      json={'email': 'utente_test_2@nest.com', 'password': 'password', 'username': 'utente_test_2'})
    j = json.loads(r.text)
    assert j['result'] == "failure"

    print("User non creato correttamente!")

    # TEST IN GET
    # User autenticato come Admin
    r = requests.post('http://localhost:5000/api/v1/login', json={'email': 'admin@admin.com', 'password': 'password'})
    j = json.loads(r.text)
    assert j['result'] == "success"
    auth_code = j['data']['access_token']

    r = requests.get(f'http://localhost:5000/api/v1/users', headers={'authorization': "Bearer " + auth_code})
    j = json.loads(r.text)
    assert j['result'] == "success"

    for i in j:
        print(j[i])

    # User autenticato come non-Admin
    r = requests.post('http://localhost:5000/api/v1/login', json={'email': 'utente_test@nest.com', 'password': 'password'})
    j = json.loads(r.text)
    assert j['result'] == "success"
    auth_code = j['data']['access_token']

    r = requests.get(f'http://localhost:5000/api/v1/users', headers={'authorization': "Bearer " + auth_code})
    j = json.loads(r.text)
    assert j['result'] == "failure"


print("Testing del metodo user_create")


if __name__ == '__main__':
    unittest.main()


