import requests
import random


def fetch_object_ids():
    url = "https://collectionapi.metmuseum.org/public/collection/v1/search?dateBegin=-1000&dateEnd=2100&q='any'"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return data["objectIDs"]
    else:
        print(f"Failed to retrieve data: {response.status_code}")
        return []


# get all object ids
object_ids = fetch_object_ids()
random.shuffle(object_ids)
print(f"Retrieved {len(object_ids)} object IDs.")

# keep going in the list until data is filled
target = []

for object_id in object_ids:
    print(object_id)
    url = (
        f"https://collectionapi.metmuseum.org/public/collection/v1/objects/{object_id}"
    )
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()

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
    print(object_id)

    if len(target) == 5:
        break

print("\n DONE ! \n")
for item in target:
    print(item)
    print(item["primaryImage"])
    print(item["objectBeginDate"])
    print(item["objectEndDate"])
    print("\n")
