import sys
from pathlib import Path
from contextlib import asynccontextmanager

# Garante que o diretório raiz 'backend' esteja no sys.path
backend_dir = Path(__file__).resolve().parent.parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

import uvicorn
from fastapi import FastAPI

import os
from dotenv import load_dotenv
from starlette.middleware.sessions import SessionMiddleware

load_dotenv()

from app.routes import activities, auth


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🚀 Strava Analyzer iniciado!")
    yield


from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(lifespan=lifespan)

# CORS para o Frontend React
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

secret_key = os.getenv("SECRET_KEY", "secret_key_default_change_me")
app.add_middleware(SessionMiddleware, secret_key=secret_key)

app.include_router(auth.router)
app.include_router(activities.router)


@app.get("/")
def home():
    return {"message": "Strava analyzer funcionando"}


if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="127.0.0.1",
        port=8000,
        reload=True
    )