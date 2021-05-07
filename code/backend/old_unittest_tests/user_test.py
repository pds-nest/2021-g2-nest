import requests
import json
import unittest

auth_code = ""


class MyTestCase(unittest.TestCase):
    def test_user_delete(self):
        global auth_code

        # sono un utente normale
        r = requests.post('http://localhost:5000/api/v1/login',
                          json={'email': 'utente_test@nest.com', 'password': 'password'})
        j = json.loads(r.text)
        assert j['result'] == "success"
        auth_code = j['data']['access_token']

        # elimino ma non sono admin
        r = requests.delete(f'http://localhost:5000/api/v1/users/admin@admin.com',
                            headers={'authorization': "Bearer " + auth_code})
        j = json.loads(r.text)
        assert j['result'] == "failure"

        print("delete User NON eseguito correttamente!")

        # adesso divento admin
        r = requests.post('http://localhost:5000/api/v1/login',
                          json={'email': 'admin@admin.com', 'password': 'password'})
        j = json.loads(r.text)
        assert j['result'] == "success"
        auth_code = j['data']['access_token']

        # elimino un utente che non c'è
        r = requests.delete(f'http://localhost:5000/api/v1/users/none@nest.com',
                            headers={'authorization': "Bearer " + auth_code})
        j = json.loads(r.text)
        assert j['result'] == "failure"

        print("delete User NON eseguito correttamente!")

        r = requests.delete(f'http://localhost:5000/api/v1/users/admin@admin.com',
                            headers={'authorization': "Bearer " + auth_code})
        j = json.loads(r.text)
        assert j['result'] == "failure"

        print("delete User NON eseguito correttamente!")

        r = requests.delete(f'http://localhost:5000/api/v1/users/utente13@nest.com',
                            headers={'authorization': "Bearer " + auth_code})
        j = json.loads(r.text)
        assert j['result'] == "failure"

        print("delete User eseguito correttamente!")

        # chiedo le info di un utente che esiste
        r = requests.get(f'http://localhost:5000/api/v1/users/utente_test@nest.com',
                         headers={'authorization': "Bearer " + auth_code})
        j = json.loads(r.text)
        assert j['result'] == "success"

        print("get User info eseguito correttamente!")

        # chiedo le info di un utente che NON esiste
        r = requests.get(f'http://localhost:5000/api/v1/users/utente_chenonesiste@nest.com',
                         headers={'authorization': "Bearer " + auth_code})
        j = json.loads(r.text)
        assert j['result'] == "failure"

        print("get User info NON eseguito correttamente!")

        # modifico le info di un utente
        r = requests.patch(f'http://localhost:5000/api/v1/users/utente1@nest.com',
                           headers={'authorization': "Bearer " + auth_code},
                           json={'username': 'utente1_modificato', 'password': 'password'})
        j = json.loads(r.text)
        assert j['result'] == "success"

        print("patch User info eseguito correttamente!")

        print("Tutti i test eseguiti correttamente!")

    print("Testing dei metodo user delete, get e patch")
