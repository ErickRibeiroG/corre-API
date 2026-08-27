from fastapi import APIRouter, HTTPException

from app.services.strava import get_access_token, list_activities

router = APIRouter()

@router.get("/activities")
def activities():
    access_token = get_access_token()
    if access_token is None:
        raise HTTPException(status_code=401, detail="Strava não conectado")

    return list_activities(access_token)