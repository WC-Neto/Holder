from fastapi import APIRouter

router = APIRouter()

@router.get("/pedidos")
def listar_pedidos_disponiveis():
    return {}

@router.put("/pedidos/{pedido_id}/aceitar")
def aceitar_pedido(pedido_id: int):
    return {}

@router.put("/pedidos/{pedido_id}/desistir")
def desistir_atendimento(pedido_id: int):
    return {}

@router.put("/pedidos/{pedido_id}/finalizar")
def finalizar_pedido(pedido_id: int):
    return {}