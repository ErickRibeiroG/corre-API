import os

from fastapi import APIRouter
from fastapi.responses import RedirectResponse

from app.services.strava import exchange_code_for_token

router = APIRouter(prefix="/auth")


@router.get("/login")
def login():
	strava_url = (
		"https://www.strava.com/oauth/authorize"
		f"?client_id={os.getenv('STRAVA_CLIENT_ID')}"
		f"&redirect_uri={os.getenv('STRAVA_REDIRECT_URI')}"
		"&response_type=code"
		"&approval_prompt=auto"
		"&scope=read,activity:read"
	)
	return RedirectResponse(strava_url)


@router.get("/callback")
def callback(code: str):
	exchange_code_for_token(code)
	return {"message": "Strava conectado com sucesso!"}
