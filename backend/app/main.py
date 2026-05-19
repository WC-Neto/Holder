from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pathlib import Path
import models
from database import engine, Base
from controllers.router_usuarios import router_idoso, router_voluntario
from controllers.router_pedidos import router_pedidos

Path("static/uploads").mkdir(parents=True, exist_ok=True)

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Holder API", version="1.0.0")

app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(router_idoso)
app.include_router(router_voluntario)
app.include_router(router_pedidos)

@app.get("/")
def health_check():
    return {"status": "Holder API online"}