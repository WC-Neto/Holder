from pydantic import BaseModel, EmailStr
from datetime import date
from typing import Optional
from enum import Enum
import re

class PeriodoDisponibilidade(str, Enum):
    matutino = "matutino"
    vespertino = "vespertino"
    noturno = "noturno"

class DiaSemana(str, Enum):
    segunda = "segunda"
    terca = "terca"
    quarta = "quarta"
    quinta = "quinta"
    sexta = "sexta"
    sabado = "sabado"
    domingo = "domingo"

class NecessidadesEspeciais(str, Enum):
    baixa_visao = "baixa_visao"
    surdez = "surdez"
    mobilidade_reduzida = "mobilidade_reduzida"
    cadeirante = "cadeirante"
    demencia = "demencia"
    alzheimer = "alzheimer"
    dificuldade_comunicacao = "dificuldade_comunicacao"
    deficit_cognitivo = "deficit_cognitivo"

class EnderecoCreate(BaseModel):
    cep: str
    logradouro: str
    numero: str
    complemento: Optional[str] = None
    bairro: str
    cidade: str
    estado: str

class EnderecoResponse(EnderecoCreate):
    id: int

    class Config:
        from_attributes = True

class DisponibilidadeCreate(BaseModel):
    dia_semana: DiaSemana
    periodo: PeriodoDisponibilidade

class DisponibilidadeResponse(BaseModel):
    id: int
    dia_semana: DiaSemana
    periodo: PeriodoDisponibilidade

    class Config:
        from_attributes = True

class UsuarioCreate(BaseModel):
    nome_completo: str
    data_de_nascimento: date
    cpf: str
    email: EmailStr
    telefone: str
    enderecos: list[EnderecoCreate]
    foto_perfil: str | None = None
    senha: str

class IdosoCreate(UsuarioCreate):
    #necessidades_especiais: list[NecessidadesEspeciais]
    tamanho_fonte: int
    alto_contraste: bool

class VoluntarioCreate(UsuarioCreate):
    disponibilidade: list[DisponibilidadeCreate]

class UsuarioResponse(BaseModel):
    id: int
    nome_completo: str
    data_de_nascimento: date
    cpf: str
    email: EmailStr
    telefone: str
    foto_perfil: Optional[str] = None

    class Config:
        from_attributes = True

class IdosoResponse(UsuarioResponse):
    enderecos: list[EnderecoResponse]
    #necessidades_especiais: list[NecessidadesEspeciais]
    tamanho_fonte: int
    alto_contraste: bool

    class Config:
        from_attributes = True

class VoluntarioResponse(UsuarioResponse):
    enderecos: list[EnderecoResponse]
    disponibilidades: list[DisponibilidadeResponse]

    class Config:
        from_attributes = True

def validar_senha(senha: str) -> str:
    if len(senha) < 8:
        raise ValueError("Senha deve ter no mínimo 8 caracteres")
    if not re.search(r"[A-Z]", senha.upper()):
        raise ValueError("Senha deve conter ao menos uma letra")
    if not re.search(r"[0-9]", senha):
        raise ValueError("Senha deve conter ao menos um número")
    if not re.search(r"[!@#$%^~`&*(),.?\"':{}|<>]", senha):
        raise ValueError("Senha deve conter ao menos um caractere especial")
    return senha

def validar_cep(cep: str) -> str:
    cep_limpo = re.sub(r"[^0-9]", "", cep)
    if len(cep_limpo) != 8:
        raise ValueError("CEP inválido")
    return f"{cep_limpo[:5]}-{cep_limpo[5:]}"

def validar_cpf(cpf: str) -> str:
    cpf_limpo = re.sub(r"[^0-9]", "", cpf)
    if len(cpf_limpo) != 11 or len(set(cpf_limpo)) == 1:
        raise ValueError("CPF inválido")

    soma = sum(int(cpf_limpo[i]) * (10 - i) for i in range(9))
    digito1 = (soma * 10 % 11) % 10
    if digito1 != int(cpf_limpo[9]):
        raise ValueError("CPF inválido")

    soma = sum(int(cpf_limpo[i]) * (11 - i) for i in range(10))
    digito2 = (soma * 10 % 11) % 10
    if digito2 != int(cpf_limpo[10]):
        raise ValueError("CPF inválido")

    return f"{cpf_limpo[:3]}.{cpf_limpo[3:6]}.{cpf_limpo[6:9]}-{cpf_limpo[9:]}"

def validar_telefone(telefone: str) -> str:
    tel_limpo = re.sub(r"[^0-9]", "", telefone)
    if len(tel_limpo) == 11:
        return f"({tel_limpo[:2]}) {tel_limpo[2]} {tel_limpo[3:7]}-{tel_limpo[7:]}"
    elif len(tel_limpo) == 10:
        return f"({tel_limpo[:2]}) {tel_limpo[2:6]}-{tel_limpo[6:]}"
    raise ValueError("Telefone inválido")

def validar_data_nascimento(data: date) -> date:
    hoje = date.today()
    idade = hoje.year - data.year - ((hoje.month, hoje.day) < (data.month, data.day))
    if idade < 18:
        raise ValueError("Usuário deve ter no mínimo 18 anos")
    if idade > 130:
        raise ValueError("Data de nascimento inválida")
    return data