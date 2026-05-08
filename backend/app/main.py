from fastapi import FastAPI
from controllers.router import router

app = FastAPI()

app.include_router(router)



'''from fastapi import FastAPI
from backend.app.controllers.router import router

app = FastAPI()

# Rota raiz para teste inicial (Isso evita o 404 no link principal)
@app.get("/")
async def root():
    return {"status": "Servidor Online"}

# Conecta o router
app.include_router(router, prefix="/api")

# P/ rodar servidor, usar no terminal: uvicorn backend.app.main:app --reload'''