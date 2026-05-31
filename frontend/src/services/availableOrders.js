const EMPTY_SEARCH = "";
const DEFAULT_FILTER = "all";

const categoryLabels = {
  shopping: "Compras",
  repairs: "Reparos",
  company: "Companhia",
};

function normalizeText(value = EMPTY_SEARCH) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function getSearchableOrderValues(order) {
  return [
    order.title,
    order.description,
    order.category,
    order.categoryLabel,
    categoryLabels[order.category],
    order.neighborhood,
    order.location,
    order.city,
  ].filter(Boolean);
}

function matchesSearchTerm(order, searchTerm) {
  const normalizedTerm = normalizeText(searchTerm);

  if (!normalizedTerm) {
    return true;
  }

  return getSearchableOrderValues(order).some((value) =>
    normalizeText(value).includes(normalizedTerm),
  );
}

function matchesActiveFilter(order, activeFilter = DEFAULT_FILTER) {
  if (activeFilter === DEFAULT_FILTER) {
    return true;
  }

  if (activeFilter === "urgent") {
    return order.urgencyTone === "high" || order.isUrgent === true;
  }

  return order.category === activeFilter;
}

export function searchAvailableOrders(
  orders,
  {
    searchTerm = EMPTY_SEARCH,
    q = EMPTY_SEARCH,
    activeFilter = DEFAULT_FILTER,
    category,
    priority,
  } = {},
) {
  const resolvedSearchTerm = searchTerm || q;
  const resolvedFilter =
    priority === "urgent" ? "urgent" : category || activeFilter || DEFAULT_FILTER;

  return orders.filter(
    (order) =>
      matchesSearchTerm(order, resolvedSearchTerm) &&
      matchesActiveFilter(order, resolvedFilter),
  );
}

export function buildAvailableOrdersSearchParams({
  searchTerm = EMPTY_SEARCH,
  activeFilter = DEFAULT_FILTER,
  volunteerId,
} = {}) {
  const params = {};
  const q = searchTerm.trim();

  if (q) {
    params.q = q;
  }

  if (activeFilter === "urgent") {
    params.priority = "urgent";
  } else if (activeFilter !== DEFAULT_FILTER) {
    params.category = activeFilter;
  }

  if (volunteerId !== undefined && volunteerId !== null) {
    params.volunteerId = volunteerId;
  }

  return params;
}

export async function fetchAvailableOrderDetails(orders, orderId) {
  // Futuramente: GET /pedidos/{orderId} ou endpoint equivalente de detalhes.
  return orders.find((order) => String(order.id) === String(orderId)) ?? null;
}

export async function acceptOrder({ orderId, volunteerId, shouldFail = false } = {}) {
  if (!orderId) {
    throw new Error("Pedido inválido");
  }

  if (!volunteerId) {
    throw new Error("Voluntário inválido");
  }

  if (shouldFail) {
    throw new Error("Não foi possível aceitar o pedido");
  }

  // Futuramente: PATCH /pedidos/{orderId}/aceitar com volunteerId no payload.
  return {
    id: orderId,
    volunteerId,
    status: "em_andamento",
  };
}

export async function finishOrder({
  orderId,
  volunteerId,
  report,
  shouldFail = false,
} = {}) {
  if (!orderId) {
    throw new Error("Pedido inválido");
  }

  if (!volunteerId) {
    throw new Error("Voluntário inválido");
  }

  if (!report?.trim()) {
    throw new Error("Relatório obrigatório");
  }

  if (shouldFail) {
    throw new Error("Não foi possível finalizar a ajuda");
  }

  // Futuramente: PATCH /pedidos/{orderId}/finalizar com relatório no payload.
  return {
    id: orderId,
    volunteerId,
    status: "concluido",
    report: report.trim(),
  };
}
