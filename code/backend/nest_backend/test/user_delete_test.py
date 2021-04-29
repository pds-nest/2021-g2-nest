import requests
import json
import unittest

auth_code = ""


class MyTestCase(unittest.TestCase):
    def test_user_delete(self):
        global auth_code

        # sono un utente normale
        r = requests.post('http://localhost:5000/api/v1/login', json={'email': 'utente_test@nest.com', 'password': 'password'})
        j = json.loads(r.text)
        assert j['result'] == "success"
        auth_code = j['data']['access_token']

        # elimino ma non sono admin
        r = requests.delete(f'http://localhost:5000/api/v1/users/admin@admin.com',
                            headers={'authorization': "Bearer " + auth_code},)
        j = json.loads(r.text)
        assert j['result'] == "failure"

        print("delete User NON eseguito correttamente!")

        # adesso divento admin
        r = requests.post('http://localhost:5000/api/v1/login', json={'email': 'admin@admin.com', 'password': 'password'})
        j = json.loads(r.text)
        assert j['result'] == "success"
        auth_code = j['data']['access_token']

        # elimino un utente che non c'è
        r = requests.delete(f'http://localhost:5000/api/v1/users/none@nest.com',
                            headers={'authorization': "Bearer " + auth_code},)
        j = json.loads(r.text)
        assert j['result'] == "failure"

        print("delete User NON eseguito correttamente!")

        r = requests.delete(f'http://localhost:5000/api/v1/users/admin@admin.com',
                            headers={'authorization': "Bearer " + auth_code},)
        j = json.loads(r.text)
        assert j['result'] == "failure"

        print("delete User NON eseguito correttamente!")

        r = requests.delete(f'http://localhost:5000/api/v1/users/utente12@nest.com',
                            headers={'authorization': "Bearer " + auth_code},)
        j = json.loads(r.text)
        assert j['result'] == "success"

        print("User_delete eseguito correttamente!")

    print("Testing del metodo user_delete")


