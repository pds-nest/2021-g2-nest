import requests
import json
import unittest


auth_code = ""


class MyTestCase(unittest.TestCase):
    def test_repository_create(self):
        global auth_code
        # entro come utente_Test
        r = requests.post('http://localhost:5000/api/v1/login', json={'email': 'utente_test@nest.com', 'password': 'password'})
        j = json.loads(r.text)
        assert j['result'] == "success"
        auth_code = j['data']['access_token']

        # TEST IN GET
        r = requests.post('http://localhost:5000/api/v1/login', json={'email': 'utente_test@nest.com', 'password': 'password'})
        j = json.loads(r.text)
        assert j['result'] == "success"
        auth_code = j['data']['access_token']

        r = requests.get(f'http://localhost:5000/api/v1/repositories/', headers={'authorization': "Bearer " + auth_code},
                         json={'owner_id': 'utente_test@nest.com', 'isActive': False})
        j = json.loads(r.text)
        assert j['result'] == "success"

        for i in j:
            print(j[i])
        print("Repositories letti correttamente!")

        # TODO: testare anche i parametri onlyDead e onlyActive

        # creo un repo senza nome: fallisce
        r = requests.post(f'http://localhost:5000/api/v1/repositories/', headers={'authorization': "Bearer " + auth_code},
                          json={})
        j = json.loads(r.text)
        assert j['result'] == "failure"

        # creo un repo con nome vuoto: fallisce
        r = requests.post(f'http://localhost:5000/api/v1/repositories/', headers={'authorization': "Bearer " + auth_code},
                          json={'nome': ''})
        j = json.loads(r.text)
        assert j['result'] == "failure"

        # creo un repo: successo
        r = requests.post(f'http://localhost:5000/api/v1/repositories/', headers={'authorization': "Bearer " + auth_code},
                          json={'name': 'repo_test_2'})
        j = json.loads(r.text)
        assert j['result'] == "success"

        print("Repository creata correttamente!")



print("Testing dei metodi di lettura e creazione repository")

