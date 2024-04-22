from flask import Flask, jsonify
import requests
import random

app = Flask(__name__)


def fetch_object_ids():
    """
    Fetches met museum api for all object ids.
    """
    url = "https://collectionapi.metmuseum.org/public/collection/v1/objects"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return data["objectIDs"]
    else:
        print(f"Failed to retrieve data: {response.status_code}")
        return []


@app.route("/create-game", methods=["GET"])
def create_game():
    """
    Route that creates a game and generates 5 random artifacts from the met museum.
    Makes sure that the data generated has necessary attributes:
        - Date
        - Image
    """
    print("working now")
    object_ids = fetch_object_ids()
    random.shuffle(object_ids)
    print(f"Retrieved {len(object_ids)} object IDs.")

    # keep going in the list until data is filled
    target = []
    for object_id in object_ids:
        url = f"https://collectionapi.metmuseum.org/public/collection/v1/objects/{object_id}"
        response = requests.get(url)
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


if __name__ == "__main__":
    app.run(debug=True)
