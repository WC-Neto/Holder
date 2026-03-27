from fastapi import APIRouter

router = APIRouter()

@router.post("/pedidos")
def criar_pedido():
    return {}

@router.put("/pedidos/{pedido_id}/cancelar")
def cancelar_pedido(pedido_id: int):
    return {}

@router.get("/voluntarios-proximos")
def listar_voluntarios_proximos():
    return {}

@router.put("/perfil/acessibilidade")
def gerenciar_acessibilidade():
    return {}