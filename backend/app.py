"""
Fetches from met museum api to create game and return data to frontend
"""

# pylint: disable=global-statement
import random
import os
from datetime import datetime
from flask import Flask, jsonify, request
from dotenv import load_dotenv
import requests
from pymongo import MongoClient, DESCENDING
from werkzeug.security import generate_password_hash, check_password_hash

load_dotenv()
mongo_host = os.getenv("MONGO_HOST")
app = Flask(__name__)
client = MongoClient(f"mongodb://{mongo_host}:27017/", 27017)
app.config["DB_NAME"] = "metguessr_users"
db = client[app.config["DB_NAME"]]  # Database name
users = db.users  # users collection
scores = db.scores  # scores collection


def get_db():
    """
    Sets up the correct database
    """
    global users
    global scores
    newdb = client[app.config["DB_NAME"]]
    users = newdb.users
    scores = newdb.scores


def fetch_object_ids(mode):
    """
    Fetches met museum api for all object ids.
    """
    if mode == "":
        url = "https://collectionapi.metmuseum.org/public/collection/v1/objects"
    else:
        base_url = "https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds="
        if mode == "asian":
            url = base_url + "6"
        elif mode == "medieval":
            url = base_url + "17"
        elif mode == "music":
            url = base_url + "18"
    response = requests.get(url, timeout=30)
    if response.status_code == 200:
        data = response.json()
        return data["objectIDs"]

    # catch errors
    print(f"Failed to retrieve data: {response.status_code}")
    return []


@app.route("/api/login", methods=["GET", "POST"])
def login():
    """
    Route that handles logging in.
    """
    get_db()
    if request.method == "POST":
        data = request.get_json()  # get input
        username = data.get("username")
        password = data.get("password")

        user = users.find_one({"name": username})  # get username from db
        if user and check_password_hash(user["password"], password):
            return jsonify({"message": "Logged in successfully"}), 200
    return jsonify({"error": "Invalid credentials"}), 401


@app.route("/api/register", methods=["POST"])
def register():
    """
    Route that handles registering a new user.
    """
    get_db()
    data = request.get_json()  # get input
    username = data.get("username")
    password = data.get("password")

    existing_user = users.find_one({"name": username})
    if existing_user:
        return jsonify({"error": "Username already exists"}), 409

    hashpass = generate_password_hash(password, method="pbkdf2:sha256")
    users.insert_one(
        {"name": username, "password": hashpass, "joined": datetime.utcnow()}
    )
    return jsonify({"message": "User registered successfully"}), 201


@app.route("/api/get_user/<username>", methods=["GET"])
def get_user(username):
    """
    Route that retrieves a user by a username, added in the parameter
    """
    get_db()
    user = users.find_one(
        {"name": username}, {"_id": 0, "password": 0}
    )  # exclude sensitive info
    if user:
        return jsonify(user), 200
    return jsonify({"error": "User not found"}), 404


@app.route("/api/user_score_stats/<username>", methods=["GET"])
def get_user_scores(username):
    """
    Fetches the high score and the average score for the specified user.
    """
    get_db()
    # get highest score
    high_score_data = scores.find_one(
        {"username": username}, sort=[("score", DESCENDING)]
    )
    high_score = high_score_data["score"] if high_score_data else 0

    # get average score using query
    average_score_data = scores.aggregate(
        [
            {"$match": {"username": username}},
            {"$group": {"_id": "$username", "average_score": {"$avg": "$score"}}},
        ]
    )
    average_score_result = list(average_score_data)
    average_score = (
        average_score_result[0]["average_score"] if average_score_result else 0
    )

    # return data
    return (
        jsonify(
            {
                "username": username,
                "high_score": high_score,
                "average_score": average_score,
            }
        ),
        200,
    )


@app.route("/api/create-game/<mode>", methods=["GET"])
def create_game(mode):
    """
    Route that creates a game and generates 5 random artifacts from the met museum.
    Makes sure that the data generated has necessary attributes:
        - Date
        - Image
    """
    print("Creating game...")
    if mode == "":
        print("Selected mode: Classic")
    else:
        print(f"Selected mode: {mode}")

    # get all objects
    object_ids = fetch_object_ids(mode)
    random.shuffle(object_ids)
    print(f"Retrieved {len(object_ids)} object IDs.")

    # keep going in the list until data is filled
    target = []
    for object_id in object_ids:
        url = f"https://collectionapi.metmuseum.org/public/collection/v1/objects/{object_id}"
        response = requests.get(url, timeout=30)
        if response.status_code == 200:
            data = response.json()  # parse data
            if all(
                data.get(key)
                for key in [
                    "primaryImage",
                    "objectURL",
                    "objectBeginDate",
                    "objectEndDate",
                ]
            ):
                target.append(data)
        else:
            return "Error", 500
        if len(target) == 5:
            print("Found 5!")
            break
    return jsonify(target)


@app.route("/api/add_score", methods=["POST"])
def add_score():
    """
    Route that adds a score to the leaderboard
    """
    get_db()
    username = request.json.get("username")
    score = request.json.get("score")

    # Add score with timestamp
    scores.insert_one(
        {"username": username, "score": score, "timestamp": datetime.utcnow()}
    )
    return jsonify({"message": f"Score added for {username}"}), 201


@app.route("/api/get_leaderboard", methods=["GET"])
def get_scores():
    """
    Route that retrieves all scores sorted by score in descending order
    """
    get_db()
    all_scores = scores.find().sort("score", -1)
    return (
        jsonify(
            [
                {
                    "username": x["username"],
                    "score": x["score"],
                    "timestamp": x["timestamp"],
                }
                for x in all_scores
            ]
        ),
        200,
    )


@app.route("/api/get_user_games", methods=["GET"])
def get_user_games():
    """
    Route that retrieves games for a user
    """
    get_db()
    username = request.args.get("username")
    user_games = scores.find({"username": username}).sort("timestamp", -1)
    return (
        jsonify(
            [
                {
                    "username": x["username"],
                    "score": x["score"],
                    "timestamp": x["timestamp"],
                }
                for x in user_games
            ]
        ),
        200,
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
