import unittest
import requests
import json

auth_code = ""


class MyTestCase(unittest.TestCase):
    def test_login(self):
        global auth_code
        r = requests.post('http://localhost:5000/api/v1/login', json={'email': 'admin@admin.com', 'password': 'amogus'})
        j = json.loads(r.text)
        assert j['result'] == "failure"
        r = requests.post('http://localhost:5000/api/v1/login', json={'email': '', 'password': ''})
        j = json.loads(r.text)
        assert j['result'] == "failure"
        r = requests.post('http://localhost:5000/api/v1/login', json={'email': 'admin@admin.com', 'password': 'password'})
        j = json.loads(r.text)
        assert j['result'] == "success"
        auth_code = j['data']['access_token']
        print("Login eseguito correttamente!")


print("Testing del login")

