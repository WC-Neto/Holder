import json
import uuid
from pathlib import Path

from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
import bcrypt

from models import models
import schemas
from database import get_db
from schemas import (
    validar_senha, validar_cpf, validar_cep, validar_telefone, validar_data_nascimento
)
from .auth.deps import get_current_user

UPLOAD_DIR = Path("static/uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


def hash_senha(senha: str) -> str:
    return bcrypt.hashpw(senha.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

async def salvar_foto(foto: UploadFile) -> str:
    extensao = Path(foto.filename or "").suffix.lower()
    if extensao not in {".jpg", ".jpeg", ".png", ".webp"}:
        raise HTTPException(status_code=400, detail="Formato inválido. Use JPG, PNG ou WEBP.")
    nome_arquivo = f"{uuid.uuid4()}{extensao}"
    caminho = UPLOAD_DIR / nome_arquivo
    conteudo = await foto.read()
    with open(caminho, "wb") as f:
        f.write(conteudo)
    return f"/static/uploads/{nome_arquivo}"

router_idoso = APIRouter(prefix="/idosos", tags=["Idosos"])

@router_idoso.post("/", response_model=schemas.IdosoResponse, status_code=status.HTTP_201_CREATED)
async def criar_idoso(
    nome_completo: str = Form(...),
    data_de_nascimento: str = Form(...),
    cpf: str = Form(...),
    email: str = Form(...),
    telefone: str = Form(...),
    senha: str = Form(...),
    tamanho_fonte: int = Form(16),
    alto_contraste: bool = Form(False),
    enderecos_json: str = Form(...),
    necessidades_json: str = Form("[]"),
    foto: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    try:
        cpf = validar_cpf(cpf)
        telefone = validar_telefone(telefone)
        senha = validar_senha(senha)
        from datetime import date
        data_de_nascimento = validar_data_nascimento(date.fromisoformat(data_de_nascimento))
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    if db.query(models.Idoso).filter(models.Idoso.cpf == cpf).first():
        raise HTTPException(status_code=400, detail="CPF já cadastrado")
    if db.query(models.Idoso).filter(models.Idoso.email == email).first():
        raise HTTPException(status_code=400, detail="E-mail já cadastrado")

    foto_path = None
    if foto and foto.filename:
        foto_path = await salvar_foto(foto)

    novo_idoso = models.Idoso(
        nome_completo=nome_completo,
        data_de_nascimento=data_de_nascimento,
        cpf=cpf,
        email=email,
        telefone=telefone,
        senha_hash=hash_senha(senha),
        foto_perfil=foto_path,
        tamanho_fonte=tamanho_fonte,
        alto_contraste=alto_contraste,
    )
    db.add(novo_idoso)
    db.flush()

    try:
        enderecos_data = json.loads(enderecos_json)
        if isinstance(enderecos_data, str):
            enderecos_data = json.loads(enderecos_data)
            
        for end in enderecos_data:
            end["cep"] = validar_cep(end["cep"])
            db.add(models.Endereco(**end, idoso_id=novo_idoso.id))
    except (json.JSONDecodeError, TypeError, KeyError):
        raise HTTPException(status_code=400, detail="Erro no formato do enderecos_json")

 
    # No router_usuarios.py
    try:
        if necessidades_json and necessidades_json.strip() not in ("", "null", "[]"):
            # Limpeza básica para aceitar o que vem do Swagger
            limpo = necessidades_json.strip().replace("'", '"') 
            necessidades = json.loads(limpo)
        else:
            necessidades = []
    except json.JSONDecodeError:
        # Em vez de ignorar totalmente, avisamos o que está errado sem quebrar o servidor
        raise HTTPException(status_code=400, detail="Formato de necessidades inválido. Use ['item']")
            
    db.commit()
    db.refresh(novo_idoso)
    return novo_idoso
    

@router_idoso.get("/{idoso_id}", response_model=schemas.IdosoResponse)
def exibir_perfil_idoso(idoso_id: int, db: Session = Depends(get_db)):
    idoso = db.query(models.Idoso).filter(models.Idoso.id == idoso_id).first()
    if not idoso:
        raise HTTPException(status_code=404, detail="Idoso não encontrado")
    return idoso

router_voluntario = APIRouter(prefix="/voluntarios", tags=["Voluntários"])

@router_voluntario.post("/", response_model=schemas.VoluntarioResponse, status_code=status.HTTP_201_CREATED)
async def criar_voluntario(
    nome_completo: str = Form(...),
    data_de_nascimento: str = Form(...),
    cpf: str = Form(...),
    email: str = Form(...),
    telefone: str = Form(...),
    senha: str = Form(...),
    enderecos_json: str = Form(...),
    disponibilidades_json: str = Form("[]"),
    foto: UploadFile = File(None),
    db: Session = Depends(get_db)
):

    try:
        cpf = validar_cpf(cpf)
        telefone = validar_telefone(telefone)
        senha = validar_senha(senha)
        from datetime import date
        data_de_nascimento = validar_data_nascimento(date.fromisoformat(data_de_nascimento))
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    if db.query(models.Voluntario).filter(models.Voluntario.cpf == cpf).first():
        raise HTTPException(status_code=400, detail="CPF já cadastrado")
    if db.query(models.Voluntario).filter(models.Voluntario.email == email).first():
        raise HTTPException(status_code=400, detail="E-mail já cadastrado")

    foto_path = None
    if foto and foto.filename:
        foto_path = await salvar_foto(foto)

    novo_voluntario = models.Voluntario(
        nome_completo=nome_completo,
        data_de_nascimento=data_de_nascimento,
        cpf=cpf,
        email=email,
        telefone=telefone,
        senha_hash=hash_senha(senha),
        foto_perfil=foto_path,
    )
    db.add(novo_voluntario)
    db.flush()

    for end in json.loads(enderecos_json):
        try:
            end["cep"] = validar_cep(end["cep"])
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))
        db.add(models.Endereco(**end, voluntario_id=novo_voluntario.id))

        for disp in json.loads(disponibilidades_json):
            db.add(models.Disponibilidade(
                dia_semana=disp["dia_semana"],
                periodo=disp["periodo"],
                voluntario_id=novo_voluntario.id
            ))

    db.commit()
    db.refresh(novo_voluntario)
    return novo_voluntario

@router_voluntario.get("/{voluntario_id}", response_model=schemas.VoluntarioResponse)
def exibir_perfil_voluntario(voluntario_id: int, db: Session = Depends(get_db)):
    voluntario = db.query(models.Voluntario).filter(models.Voluntario.id == voluntario_id).first()
    if not voluntario:
        raise HTTPException(status_code=404, detail="Voluntário não encontrado")
    return voluntario





