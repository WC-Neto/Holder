from fastapi import APIRouter, HTTPException
from models.models import Usuario

router = APIRouter()

usuarios: list[Usuario] = []

@router.post("/cadastro")
async def cadastrar_usuario(usuario: Usuario):
    usuarios.append(usuario)
    return {"mensagem": f"Usuárie {usuario.nome_completo} cadastrado com sucesso!"}

@router.get("/usuarios/{cpf}")
async def buscar_usuario(cpf: str):

    for usuario in usuarios:
        if usuario.cpf == cpf:
            return usuario
    raise HTTPException(status_code=404, detail="Usuário não encontrado")





'''from fastapi import APIRouter
from pydantic import BaseModel, EmailStr

# Aqui usamos APIRouter, não FastAPI
router = APIRouter()

@router.get("/teste")
async def rota_teste():
    return {"message": "O router funcionou!"}

@router.post("/cadastro")
async def cadastrar_usuario(cadastro: CadastroUsuario):
    {"nome_completo": cadastro.nome, "data_de_nascimento": cadastro.data_nascimento, "cpf": cadastro.cpf, "email": cadastro.email, "telefone": cadastro.telefone, "endereco_completo": cadastro.endereco.completo, "senha": cadastro.senha, "confirmacao_senha": cadastro.confirmacao_senha}



    return {"message": f"Usuário {cadastro.nome} cadastrado com sucesso!"}

Uma rota

@router.get("/perfil")
async def mostrar_perfil(cadastro: CadastroUsuario):
    return {"message": f"Usuário {cadastro.nome} cadastrado com sucesso!"}



'''