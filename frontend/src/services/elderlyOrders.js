import { createOrderMock } from "../data/mockElderlyOrders";

export const validateElderlyOrder = (payload) => {
  if (
    typeof payload.titulo !== "string" ||
    payload.titulo.length < 5 ||
    payload.titulo.length > 50
  ) {
    throw new Error("O título deve ter entre 5 e 50 caracteres");
  }

  if (typeof payload.descricao !== "string" || payload.descricao.length > 300) {
    throw new Error("A descrição não pode ultrapassar 300 caracteres");
  }

  if (!payload.categoria || String(payload.categoria).trim() === "") {
    throw new Error("A categoria é obrigatória");
  }

  if (!payload.prioridade || String(payload.prioridade).trim() === "") {
    throw new Error("A prioridade é obrigatória");
  }
};

export const createOrder = async (payload) => {
  try {
    validateElderlyOrder(payload);
    // Futuramente, algo como await api.post('/pedidos/', payload); -- ler backend
    const response = await createOrderMock(payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
