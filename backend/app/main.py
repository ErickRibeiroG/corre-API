from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from dotenv import load_dotenv
import requests
import os

load_dotenv()

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Strava alalyzer funcionando"}

@app.get("/auth/login")
def login():
    client_id = os.getenv("STRAVA_CLIENT_ID")
    redirect_uri = os.getenv("STRAVA_REDIRECT_URI")   

    strava_url = (
       "https://www.strava.com/oauth/authorize"
        f"?client_id={client_id}"
        f"&redirect_uri={redirect_uri}"
        "&response_type=code"
        "&approval_prompt=auto"
        "&scope=read,activity:read" 
    )

    return RedirectResponse(strava_url)


@app.get("/auth/callback")
def callback(code: str):
    client_id = os.getenv("STRAVA_CLIENT_ID")
    client_secret = os.getenv("STRAVA_CLIENT_SECRET")

    response = requests.post(
        "https://www.strava.com/oauth/token",
        data={
            "client_id": client_id,
            "client_secret": client_secret,
            "code": code,
            "grant_type": "authorization_code"
        }
    )

    return response.json()

@app.get("/activities")
def activities(access_token: str):
    response = requests.get(
        "https://www.strava.com/api/v3/athlete/activities",
        headers={
            "Authorization": f"Bearer {access_token}"
        },
        params={
            "per_page": 30
        }
    )

    return response.json()