from fastapi import FastAPI

app = FastAPI()  # <- o uvicorn procura exatamente essa variável

@app.get("/")
def root():
    return {"message": "API rodando 🚀"}  