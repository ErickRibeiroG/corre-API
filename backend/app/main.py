import sys
from pathlib import Path
from contextlib import asynccontextmanager

# Garante que o diretório raiz 'backend' esteja no sys.path
backend_dir = Path(__file__).resolve().parent.parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

import uvicorn
from fastapi import FastAPI

from app.database import Base, engine
from app.routes import activities, auth


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        Base.metadata.create_all(bind=engine)
        print("✅ Conexão com o banco de dados PostgreSQL estabelecida com sucesso!")
    except Exception as e:
        print(f"⚠️ Aviso: Banco de dados não conectado (Certifique-se de que o Docker esteja rodando): {e}")
    yield


app = FastAPI(lifespan=lifespan)

app.include_router(auth.router)
app.include_router(activities.router)


@app.get("/")
def home():
    return {"message": "Strava analyzer funcionando"}


if __name__ == "__main__":
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)


