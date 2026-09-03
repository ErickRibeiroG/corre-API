from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.services.strava import get_access_token, list_activities

router = APIRouter()


@router.get("/activities")
def activities(
    db: Session = Depends(get_db)
):
    access_token = get_access_token(db)

    if access_token is None:
        raise HTTPException(
            status_code=401,
            detail="Strava não conectado"
        )

    return list_activities(access_token)