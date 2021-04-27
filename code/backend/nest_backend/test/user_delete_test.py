import requests
import json

auth_code = ""


def test_user_delete():
    global auth_code

    r = requests.post('http://localhost:5000/api/login', json={'email': 'admin@admin.com', 'password': 'password'})
    j = json.loads(r.text)
    assert j['result'] == "success"
    auth_code = j['data']['access_token']

    r = requests.post(f'http://localhost:5000/api/user/remove', headers={'authorization': "Bearer " + auth_code},
                      json={'email': 'utente10@nest.com'})
    j = json.loads(r.text)
    assert j['result'] == "success"

    print("User_delete eseguito correttamente!")


print("Testing del metodo user_delete")
test_user_delete()
