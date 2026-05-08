from pydantic import BaseModel, EmailStr

class CadastroUsuario(BaseModel):
    email: EmailStr
    senha: str
    nome: str

class LoginRequest(BaseModel):
    email: EmailStr
    senha: str

