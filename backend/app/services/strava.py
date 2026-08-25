import os
import json
import time
import requests

TOKEN_FILE = "app/strava_token.json"

def save_token(token_data):
    with open(TOKEN_FILE, "w") as file:
        json.dump(token_data, file, indent = 4)

def load_token():
    if not os.path.exists(TOKEN_FILE):
        return None

    with open(TOKEN_FILE, "r") as file:
        return json.load(file)

def refresh_acess_token():
    token = load_token()

    response = requests.post(
        "https://www.strava.com/oauth/token",
        data={
            "client_id": os.getenv("STRAVA_CLIENT_ID"),
            "client_secret": os.getenv("STRAVA_CLIENT_SECRET"),
            "refresh_token": token["refresh_token"],
            "grant_type": "refresh_token"
        }
    )

    response.raise_for_status()

    new_token = response.json()

    save_token(new_token)

    return new_token["acess_token"]

def get_acess_token():
    token = load_token()

    if token is None:
        return None

    if token["expires_at"] > time.time():
        return token["acess_token"]

    return refresh_acess_token