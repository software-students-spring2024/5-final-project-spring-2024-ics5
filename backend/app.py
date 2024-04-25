"""
Fetches from met museum api to create game and return data to frontend
"""

import random
from flask import Flask, jsonify, request
import requests
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime


app = Flask(__name__)
client = MongoClient('mongodb://localhost:27017/', 27017)
db = client['metguessr_users']  # Database name
users = db.users  # users collection
scores = db.scores # scores collection

def fetch_object_ids():
    """
    Fetches met museum api for all object ids.
    """
    url = "https://collectionapi.metmuseum.org/public/collection/v1/objects"
    response = requests.get(url, timeout=30)
    if response.status_code == 200:
        data = response.json()
        return data["objectIDs"]

    # catch errors
    print(f"Failed to retrieve data: {response.status_code}")
    return []
    
@app.route('/api/login', methods=['GET', 'POST'])
def login():
    """
    Route that handles logging in.
    """
    if request.method == 'POST':
        data = request.get_json() # get input
        username = data.get('username')
        password = data.get('password')
        
        user = users.find_one({'name': username}) # get username from db
        if user and check_password_hash(user['password'], password):
            return jsonify({'message': 'Logged in successfully'}), 200
        else:
            return jsonify({'error': 'Invalid credentials'}), 401


@app.route('/api/register', methods=['POST'])
def register():
    """
    Route that handles registering a new user.
    """
    data = request.get_json() # get input
    username = data.get('username')
    password = data.get('password')

    existing_user = users.find_one({'name': username})
    if existing_user:
        return jsonify({'error': 'Username already exists'}), 409

    hashpass = generate_password_hash(password, method='pbkdf2:sha256')
    users.insert_one({'name': username, 'password': hashpass})
    return jsonify({'message': 'User registered successfully'}), 201

@app.route("/api/create-game", methods=["GET"])
def create_game():
    """
    Route that creates a game and generates 5 random artifacts from the met museum.
    Makes sure that the data generated has necessary attributes:
        - Date
        - Image
    """
    print("Creating game...")
    object_ids = fetch_object_ids()
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

@app.route('/api/add_score', methods=['POST'])
def add_score():
    """
    Route that adds a score to the leaderboard
    """
    username = request.json.get('username')
    score = request.json.get('score')

    # Add score with timestamp
    scores.insert_one({'username': username, 'score': score, 'timestamp': datetime.utcnow()})
    return jsonify({'message': f'Score added for {username}'}), 201

@app.route('/api/get_leaderboard', methods=['GET'])
def get_scores():
    """
    Route that retrieves all scores sorted by score in descending order
    """
    all_scores = scores.find().sort('score', -1)
    return jsonify([{'username': x['username'], 'score': x['score'], 'timestamp': x['timestamp']} for x in all_scores]), 200


if __name__ == "__main__":
    app.run(debug=True)
