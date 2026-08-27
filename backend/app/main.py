from fastapi import FastAPI

from app.routes import activities, auth


app = FastAPI()

app.include_router(auth.router)
app.include_router(activities.router)

@app.get("/")
def home():
    return {"message": "Strava analyzer funcionando"}
