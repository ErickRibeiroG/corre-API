from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.services.strava import get_access_token, list_activities

router = APIRouter()


@router.get("/activities")
def activities(
    request: Request,
    db: Session = Depends(get_db)
):
    athlete_id = request.session.get("athlete_id")

    if not athlete_id:
        raise HTTPException(
            status_code=401,
            detail="Não autenticado. Por favor, faça login via /auth/login"
        )

    access_token = get_access_token(db, athlete_id=athlete_id)

    if access_token is None:
        raise HTTPException(
            status_code=401,
            detail="Conta do Strava não encontrada para a sessão atual."
        )

    return list_activities(access_token)