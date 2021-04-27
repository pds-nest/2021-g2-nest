import requests
import json

auth_code = ""


def test_user_create():
    global auth_code

    r = requests.post('http://localhost:5000/api/login', json={'email': 'admin@admin.com', 'password': 'password'})
    j = json.loads(r.text)
    assert j['result'] == "success"
    auth_code = j['data']['access_token']

    r = requests.post(f'http://localhost:5000/api/user/create', headers={'authorization': "Bearer " + auth_code},
                      json={'email': 'utente11@nest.com', 'password': '1234', 'username': 'utente11'})
    j = json.loads(r.text)
    assert j['result'] == "success"

    print("User_create eseguito correttamente!")


print("Testing del metodo user_create")
test_user_create()
