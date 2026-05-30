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
