import sys
from pathlib import Path
import uvicorn
from fastapi import FastAPI

# Garante que o diretório raiz 'backend' esteja no sys.path
backend_dir = Path(__file__).resolve().parent.parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

from app.routes import activities, auth

app = FastAPI()

app.include_router(auth.router)
app.include_router(activities.router)

@app.get("/")
def home():
    return {"message": "Strava analyzer funcionando"}


if __name__ == "__main__":
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)

