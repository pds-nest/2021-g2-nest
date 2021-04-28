import requests
import json
import unittest

auth_code = ""


class MyTestCase(unittest.TestCase):
    def test_user_delete(self):
        global auth_code

        #testo come utente normale
        r = requests.post('http://localhost:5000/api/login', json={'email': 'utente_test@nest.com', 'password': 'password'})
        j = json.loads(r.text)
        assert j['result'] == "success"
        auth_code = j['data']['access_token']

        #cancellazione utente qualunque: fallisce, non sono admin
        r = requests.post(f'http://localhost:5000/api/user/remove', headers={'authorization': "Bearer " + auth_code},
                          json={'email': 'utente_qualunque@nest.com'})
        j = json.loads(r.text)
        assert j['result'] == "failure"

        #testo come utente admin
        r = requests.post('http://localhost:5000/api/login', json={'email': 'admin@admin.com', 'password': 'password'})
        j = json.loads(r.text)
        assert j['result'] == "success"
        auth_code = j['data']['access_token']

        #test cancellazione senza specificare user, fallisce
        r = requests.post(f'http://localhost:5000/api/user/remove', headers={'authorization': "Bearer " + auth_code},
                          json={'email': ''})
        j = json.loads(r.text)
        assert j['result'] == "failure"

        #test cancellazione user non esistente, fallisce
        r = requests.post(f'http://localhost:5000/api/user/remove', headers={'authorization': "Bearer " + auth_code},
                          json={'email': 'none@nest.com'})
        j = json.loads(r.text)
        assert j['result'] == "failure"

        #test cancellazione user corrente, fallisce
        r = requests.post(f'http://localhost:5000/api/user/remove', headers={'authorization': "Bearer " + auth_code},
                          json={'email': 'admin@nest.com'})
        j = json.loads(r.text)
        assert j['result'] == "failure"

        r = requests.post(f'http://localhost:5000/api/user/remove', headers={'authorization': "Bearer " + auth_code},
                          json={'email': 'utente_test@nest.com'})
        j = json.loads(r.text)
        assert j['result'] == "success"

        print("User_delete eseguito correttamente!")

    print("Testing del metodo user_delete")


