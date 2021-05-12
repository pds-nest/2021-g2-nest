import pytest
import uuid

import requests

from nest_backend.app import app
from nest_backend.gestione import gen_password
from nest_backend.database import ext
from nest_backend.database.tables import User


@pytest.fixture(scope="package", autouse=True)
def flask_client():
    # Enter testing mode
    app.config["TESTING"] = True

    # Get environment variables
    app.config.from_envvar("FLASK_CONFIG")

    # Initialize database
    with app.app_context():
        # Use unique db schemas for each test session
        uniq_schema = f"test_{uuid.uuid4()}"
        ext.engine.execute(f"""CREATE SCHEMA "{uniq_schema}";""")
        for table in ext.Model.metadata.tables.values():
            table.schema = uniq_schema

        ext.create_all(app=app)
        if not User.query.filter_by(isAdmin=True).all():
            ext.session.add(
                User(email="admin@admin.com", password=gen_password("password"), username="admin", isAdmin=True))
            ext.session.commit()

    # Prepare test client
    with app.test_client(use_cookies=False) as client:
        yield client

    # Teardown schema
    with app.app_context():
        ext.engine.execute(f"""DROP SCHEMA "{uniq_schema}" CASCADE;""")


@pytest.fixture(scope="package")
def admin_access_token(flask_client):
    response = flask_client.post("/api/v1/login", json={
        "email": "admin@admin.com",
        "password": "password"
    })
    assert response.json is not None
    assert "result" in response.json
    assert response.json["result"] == "success"
    assert "data" in response.json
    data = response.json["data"]
    assert "access_token" in data
    return data["access_token"]


@pytest.fixture(scope="package")
def user_exists(admin_headers, flask_client):
    flask_client.post(f'/api/v1/users/', headers=admin_headers, json={
        'email': 'utente_test@nest.com',
        'password': 'password',
        'username': 'utente_test'
    })


@pytest.fixture(scope="package")
def repository_exists(user_headers, flask_client):
    r = flask_client.post(f'/api/v1/repositories/', headers=user_headers, json={
        'conditions': [
            {
                'content': 'PdS2021',
                'id': 0,
                'type': 0
            }
        ],
        'evaluation_mode': 0,
        'name': 'repo_1'
    })


@pytest.fixture(scope="package")
def user_access_token(flask_client, user_exists):
    response = flask_client.post("/api/v1/login", json={
        "email": "utente_test@nest.com",
        "password": "password"
    })
    assert response.json is not None
    assert "result" in response.json
    assert response.json["result"] == "success"
    assert "data" in response.json
    data = response.json["data"]
    assert "access_token" in data
    return data["access_token"]


@pytest.fixture(scope="package")
def admin_headers(admin_access_token):
    admin_headers = {'Authorization': f"Bearer {admin_access_token}"}
    return admin_headers


@pytest.fixture(scope="package")
def user_headers(user_access_token):
    user_headers = {'Authorization': f"Bearer {user_access_token}"}
    return user_headers
