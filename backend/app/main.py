from fastapi import FastAPI
import uvicorn
from app.routes import auth, idosos, voluntarios


app = FastAPI(
    title="Holder API",
    description="Plataforma de Auxílio Comunitário para Idosos em Três Lagoas - MS",
    version="1.0.0"
)

app.include_router(auth.router, prefix="/auth", tags=["Autenticação"])
app.include_router(idosos.router, prefix="/idosos", tags=["Painel do Idoso"])
app.include_router(voluntarios.router, prefix="/voluntarios", tags=["Painel do Voluntário"])

@app.get("/")
def read_root():
    return {"mensagem": "Bem-vindo à API do Holder!"}

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)