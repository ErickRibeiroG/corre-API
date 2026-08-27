import os
import json
import time
from pathlib import Path

import requests

from dotenv import load_dotenv

load_dotenv()

TOKEN_FILE = Path(__file__).resolve().parents[1] / "strava_token.json"
STRAVA_TOKEN_URL = "https://www.strava.com/oauth/token"
STRAVA_ACTIVITIES_URL = "https://www.strava.com/api/v3/athlete/activities"

def save_token(token_data):
    with TOKEN_FILE.open("w") as file:
        json.dump(token_data, file, indent=4)

def load_token():
    if not TOKEN_FILE.exists() or TOKEN_FILE.stat().st_size == 0:
        return None

    with TOKEN_FILE.open("r") as file:
        return json.load(file)

def exchange_code_for_token(code):
    response = requests.post(
        STRAVA_TOKEN_URL,
        data={
            "client_id": os.getenv("STRAVA_CLIENT_ID"),
            "client_secret": os.getenv("STRAVA_CLIENT_SECRET"),
            "code": code,
            "grant_type": "authorization_code",
        },
    )
    response.raise_for_status()
    token_data = response.json()
    save_token(token_data)
    return token_data

def refresh_access_token():
    token = load_token()

    response = requests.post(
        STRAVA_TOKEN_URL,
        data={
            "client_id": os.getenv("STRAVA_CLIENT_ID"),
            "client_secret": os.getenv("STRAVA_CLIENT_SECRET"),
            "refresh_token": token["refresh_token"],
            "grant_type": "refresh_token",
        },
    )

    response.raise_for_status()

    new_token = response.json()

    save_token(new_token)

    return new_token["access_token"]

def get_access_token():
    token = load_token()

    if token is None:
        return None

    if token["expires_at"] > time.time():
        return token["access_token"]

    return refresh_access_token()

def list_activities(access_token):
    response = requests.get(
        STRAVA_ACTIVITIES_URL,
        headers={"Authorization": f"Bearer {access_token}"},
        params={"per_page": 30},
    )
    response.raise_for_status()
    return response.json()