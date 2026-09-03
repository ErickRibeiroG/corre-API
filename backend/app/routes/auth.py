import os

from fastapi import APIRouter, Depends
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session

from app.database.connection import get_db
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
def callback(
    code: str,
    db: Session = Depends(get_db)
):
    exchange_code_for_token(code, db)

    return {"message": "Strava conectado com sucesso!"}