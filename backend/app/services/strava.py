import os
import time
import requests
from dotenv import load_dotenv

from sqlalchemy.orm import Session
from app.database.models import User, StravaAccount

load_dotenv()

STRAVA_TOKEN_URL = "https://www.strava.com/oauth/token"
STRAVA_ACTIVITIES_URL = "https://www.strava.com/api/v3/athlete/activities"

def exchange_code_for_token(code: str, db: Session):
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
    athlete_data = token_data.get("athlete", {})
    athlete_id = athlete_data.get("id")

    if not athlete_id:
        raise ValueError("Dados do atleta não retornados pelo Strava.")

    # 1. Verifica se a conta do Strava já existe pelo strava_athlete_id
    strava_account = db.query(StravaAccount).filter(StravaAccount.strava_athlete_id == athlete_id).first()

    if strava_account:
        # Atualiza os tokens da conta existente
        strava_account.access_token = token_data["access_token"]
        strava_account.refresh_token = token_data["refresh_token"]
        strava_account.expires_at = token_data["expires_at"]
    else:
        # 2. Se não existir, cria o registro do usuário e vincula a conta do Strava
        firstname = athlete_data.get("firstname", "")
        lastname = athlete_data.get("lastname", "")
        full_name = f"{firstname} {lastname}".strip() or f"Atleta Strava {athlete_id}"
        email = athlete_data.get("email") or f"strava_{athlete_id}@strava.user"

        # Garante que não haja duplicidade de e-mail se já criado
        user = db.query(User).filter(User.email == email).first()
        if not user:
            user = User(name=full_name, email=email)
            db.add(user)
            db.flush()

        strava_account = StravaAccount(
            user_id=user.id,
            strava_athlete_id=athlete_id,
            access_token=token_data["access_token"],
            refresh_token=token_data["refresh_token"],
            expires_at=token_data["expires_at"],
        )
        db.add(strava_account)

    db.commit()
    db.refresh(strava_account)

    return token_data

def refresh_access_token(db: Session, account: StravaAccount):
    response = requests.post(
        STRAVA_TOKEN_URL,
        data={
            "client_id": os.getenv("STRAVA_CLIENT_ID"),
            "client_secret": os.getenv("STRAVA_CLIENT_SECRET"),
            "refresh_token": account.refresh_token,
            "grant_type": "refresh_token",
        },
    )

    response.raise_for_status()

    new_token = response.json()

    account.access_token = new_token["access_token"]
    account.refresh_token = new_token["refresh_token"]
    account.expires_at = new_token["expires_at"]
    
    db.commit()
    db.refresh(account)

    return account.access_token

def get_access_token(db: Session, athlete_id: int | None = None):
    if athlete_id:
        account = db.query(StravaAccount).filter(StravaAccount.strava_athlete_id == athlete_id).first()
    else:
        # Se não for passado um athlete_id específico, pega a conta conectada mais recente
        account = db.query(StravaAccount).order_by(StravaAccount.id.desc()).first()

    if account is None:
        return None

    if account.expires_at > time.time():
        return account.access_token

    return refresh_access_token(db, account)

def list_activities(access_token):
    response = requests.get(
        STRAVA_ACTIVITIES_URL,
        headers={"Authorization": f"Bearer {access_token}"},
        params={"per_page": 30},
    )
    response.raise_for_status()
    return response.json()