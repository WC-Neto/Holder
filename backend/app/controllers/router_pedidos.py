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
# from controllers.auth.deps import get_current_user

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
    idoso_id_manual: int = Form(...), 
    db: Session = Depends(get_db)
):
   
    idoso = db.query(models.Idoso).filter(models.Idoso.id == idoso_id_manual).first()
    if not idoso:
        raise HTTPException(status_code=404, detail="Idoso não encontrado.")

    
    pedido_ativo = db.query(models.PedidoAjuda).filter(
        models.PedidoAjuda.idoso_id == idoso_id_manual,
        models.PedidoAjuda.status.in_(["aberto", "em_andamento"])
    ).first()
    
    if pedido_ativo:
        raise HTTPException(status_code=400, detail="Este idoso já possui um pedido em aberto.")

    novo_pedido = models.PedidoAjuda(
        titulo=titulo,
        descricao=descricao,
        categoria=categoria,
        prioridade=prioridade,
        idoso_id=idoso_id_manual, 
        data_criacao=date.today(),
        status="aberto"
    )
    
    db.add(novo_pedido)
    db.commit()
    db.refresh(novo_pedido)
    return novo_pedido


@router_pedidos.get("/ativos/{idoso_id}", response_model=list[schemas.PedidoResponse])
def listar_pedidos_ativos(idoso_id: int, db: Session = Depends(get_db)):

    pedidos = db.query(models.PedidoAjuda).filter(
        models.PedidoAjuda.idoso_id == idoso_id,
        models.PedidoAjuda.status.in_(["aberto", "em_andamento"])
    ).all()
    
    return pedidos


@router_pedidos.patch("/{pedido_id}/finalizar", response_model=schemas.PedidoResponse)
def finalizar_pedido(pedido_id: int, db: Session = Depends(get_db)):
  
    pedido = db.query(models.PedidoAjuda).filter(models.PedidoAjuda.id == pedido_id).first()
    
 
    if not pedido:
        raise HTTPException(status_code=404, detail="Pedido não encontrado.")
    
    pedido.status = "finalizado"
    
    db.commit()
    db.refresh(pedido)
    return pedido


@router_pedidos.get("/voluntarios/proximos/{idoso_id}", response_model=list[schemas.VoluntarioResponse])
def listar_voluntarios_proximos(idoso_id: int, db: Session = Depends(get_db)):

    endereco_idoso = db.query(models.Endereco).filter(models.Endereco.idoso_id == idoso_id).first()
    
    if not endereco_idoso:
        raise HTTPException(status_code=404, detail="Endereço do idoso não encontrado.")

    voluntarios = db.query(models.Voluntario).join(models.Endereco).filter(
        models.Endereco.cidade == endereco_idoso.cidade,
        models.Endereco.bairro == endereco_idoso.bairro
    ).all()
    
    return voluntarios


@router_pedidos.get("/historico/{idoso_id}", response_model=list[schemas.PedidoResponse])
def listar_historico_pedidos(
    idoso_id: int, 
    categoria: str = None, 
    db: Session = Depends(get_db)
):
    query = db.query(models.PedidoAjuda).filter(
        models.PedidoAjuda.idoso_id == idoso_id,
        models.PedidoAjuda.status == "finalizado"
    )
    
    if categoria:
        query = query.filter(models.PedidoAjuda.categoria == categoria)
    
    return query.all()