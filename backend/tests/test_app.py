"""
Tests for the Python backend
"""

# pylint: disable=import-error, unused-argument, redefined-outer-name
import os
import pytest
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash
from pymongo import MongoClient
from app import app, fetch_object_ids

load_dotenv()
mongo_host = os.getenv("MONGO_HOST")


@pytest.fixture(scope="module")
def client():
    """
    Sets up the testing client
    """
    app.config["TESTING"] = True
    app.config["DB_NAME"] = "testing"  # adjust the database configuration for testing
    mongoclient = MongoClient(f"mongodb://{mongo_host}:27017/")

    with app.test_client() as testing_client:
        with app.app_context():
            yield testing_client
        mongoclient = MongoClient(f"mongodb://{mongo_host}:27017/")
        mongoclient.drop_database("testing")


# Fixture to setup a user in the database before tests
@pytest.fixture(scope="module")
def setup_database():
    """
    Sets up the testing database
    """
    mongoclient = MongoClient(f"mongodb://{mongo_host}:27017/")
    db = mongoclient["testing"]
    users = db.users
    users.insert_one(
        {
            "name": "test",
            "password": generate_password_hash("test", method="pbkdf2:sha256"),
        }
    )
    yield  # this allows the test to run after setup
    mongoclient.drop_database("testing")  # clean up after tests are done


# Test if objects fetched correctly
def test_object_fetch():
    """
    Test fetch object IDs
    """
    data = fetch_object_ids()
    assert len(data) > 0


def test_login(client, setup_database):
    """
    Test valid login
    """
    response = client.post(
        "/api/login", json={"username": "test", "password": "test"}
    ).status_code
    assert response == 200


def test_bad_login(client):
    """
    Test bad login
    """
    response = client.post(
        "/api/login", json={"username": "test", "password": "wrong"}
    ).status_code
    assert response == 401


def test_register(client):
    """
    Test valid register
    """
    response = client.post(
        "/api/register", json={"username": "newuser", "password": "newuser"}
    ).status_code
    assert response == 201


def test_bad_register(client):
    """
    Test bad register
    """
    response = client.post(
        "/api/register", json={"username": "test", "password": "test"}
    ).status_code
    assert response == 409


def test_get_user(client):
    """
    Test get user
    """
    response = client.get("/api/get_user/test").status_code
    assert response == 200


def test_get_user_score(client):
    """
    Test get user score
    """
    response = client.get("/api/user_score_stats/test")
    code = response.status_code
    body = response.json
    assert code == 200
    assert body["high_score"] == 0


def test_create_game(client):
    """
    Test create game
    """
    response = client.get("/api/create-game/asian")
    code = response.status_code
    body = response.json
    assert code == 200
    assert len(body) > 0


def test_addscore(client):
    """
    Test add score
    """
    response = client.post(
        "/api/add_score", json={"username": "test", "score": 10}
    ).status_code
    assert response == 201


def test_leaderboard(client):
    """
    Test leaderboard
    """
    response = client.get("/api/get_leaderboard")
    code = response.status_code
    body = response.json
    assert code == 200
    assert len(body) > 0


def test_getgames(client):
    """
    Test get games
    """
    response = client.get("/api/get_user_games", json={"username": "test"})
    code = response.status_code
    assert code == 200
