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
from datetime import date
from fastapi import Form
import schemas

UPLOAD_DIR = Path("static/uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

router_pedidos = APIRouter(prefix="/pedidos", tags=["Pedidos"])

 
@router_pedidos.post("/", response_model=schemas.PedidoResponse)
async def criar_pedido(
    titulo: str = Form(...),
    descricao: str = Form(...),
    categoria: str = Form(...),
    prioridade: schemas.Prioridade = Form(...), 
    idoso_id: int = Form(...),
    db: Session = Depends(get_db)
):
    # Verifica se o idoso existe antes de criar o pedido
    idoso_existe = db.query(models.Idoso).filter(models.Idoso.id == idoso_id).first()
    if not idoso_existe:
        raise HTTPException(status_code=404, detail="Idoso não encontrado")

    # Validação RF18: Bloqueio se houver pedido ativo
    pedido_ativo = db.query(models.PedidoAjuda).filter(
        models.PedidoAjuda.idoso_id == idoso_id,
        models.PedidoAjuda.status.in_(["aberto", "em_andamento"])
    ).first()
    
    if pedido_ativo:
        raise HTTPException(status_code=400, detail="Você já possui um pedido em aberto.")

    novo_pedido = models.PedidoAjuda(
        titulo=titulo,
        descricao=descricao,
        categoria=categoria,
        prioridade=prioridade,
        idoso_id=idoso_id,
        data_criacao=date.today(),
        status="aberto"
    )
    
    db.add(novo_pedido)
    db.commit()
    db.refresh(novo_pedido)
    return novo_pedido