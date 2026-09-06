import os

from fastapi import APIRouter, Depends, Request, HTTPException
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.database.models import StravaAccount
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
    request: Request,
    code: str,
    db: Session = Depends(get_db)
):
    token_data = exchange_code_for_token(code, db)
    athlete = token_data.get("athlete", {})
    athlete_id = athlete.get("id")

    # Armazena o athlete_id na sessão criptografada (cookie HTTP-Only)
    request.session["athlete_id"] = athlete_id

    athlete_name = f"{athlete.get('firstname', '')} {athlete.get('lastname', '')}".strip()

    return {
        "message": f"Strava conectado com sucesso para {athlete_name}!",
        "athlete_id": athlete_id
    }


@router.get("/me")
def me(
    request: Request,
    db: Session = Depends(get_db)
):
    athlete_id = request.session.get("athlete_id")

    if not athlete_id:
        raise HTTPException(
            status_code=401,
            detail="Nenhum usuário autenticado no momento."
        )

    account = db.query(StravaAccount).filter(StravaAccount.strava_athlete_id == athlete_id).first()

    if not account:
        raise HTTPException(
            status_code=404,
            detail="Conta não encontrada no sistema."
        )

    return {
        "user_id": account.user_id,
        "strava_athlete_id": account.strava_athlete_id,
        "athlete_name": account.user.name if account.user else None,
        "athlete_email": account.user.email if account.user else None
    }


@router.get("/logout")
def logout(request: Request):
    request.session.clear()
    return {"message": "Sessão encerrada com sucesso."}