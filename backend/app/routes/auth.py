from fastapi import APIRouter

router = APIRouter()

@router.post("/login")
def autenticar_usuario():
    return {}

@router.post("/cadastrar")
def cadastrar_usuario():
    return {}

@router.post("/recuperar-senha")
def recuperar_senha():
    return {}