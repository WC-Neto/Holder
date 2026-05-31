import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const src = join(root, "src");

const readSrc = (file) => readFileSync(join(src, file), "utf8");
const orderIds = (orders) => orders.map((order) => order.id);

const requiredFiles = [
  "components/volunteer/pages/VolunteerHomePage.jsx",
  "components/volunteer/VolunteerHomeHeader.jsx",
  "components/volunteer/SearchInput.jsx",
  "components/volunteer/VolunteerOrderFilters.jsx",
  "components/volunteer/AvailableOrderCard.jsx",
  "components/volunteer/OrderDetailsModal.jsx",
  "components/volunteer/UrgencyBadge.jsx",
  "components/volunteer/OrderMetaInfo.jsx",
  "components/volunteer/VolunteerCommunityCard.jsx",
  "components/volunteer/VolunteerStatsCard.jsx",
  "components/volunteer/LoadMoreButton.jsx",
  "data/mockOrders.js",
  "data/mockVolunteerStats.js",
  "services/availableOrders.js",
  "services/volunteerStats.js",
];

for (const file of requiredFiles) {
  assert.equal(existsSync(join(src, file)), true, `${file} should exist`);
}

const page = readSrc("components/volunteer/pages/VolunteerHomePage.jsx");

for (const text of [
  "Pedidos Disponíveis",
  "Buscar pedidos perto de você...",
  "Carregar mais",
  "Comunidade Ativa",
  "Ver Idosos Próximos",
  "Suas Estatísticas",
]) {
  assert.match(page, new RegExp(text), `VolunteerHomePage should include ${text}`);
}

for (const [pattern, message] of [
  [/searchTerm/, "VolunteerHomePage should keep searchTerm state"],
  [/debouncedSearchTerm/, "VolunteerHomePage should debounce search input"],
  [/activeFilter/, "VolunteerHomePage should keep active filter state"],
  [/searchAvailableOrders/, "VolunteerHomePage should use searchAvailableOrders"],
  [/VolunteerOrderFilters/, "VolunteerHomePage should use VolunteerOrderFilters"],
  [/isDetailsOpen/, "VolunteerHomePage should open an order details dialog"],
  [/isAcceptDialogOpen/, "VolunteerHomePage should open an accept confirmation dialog"],
  [/OrderDetailsModal/, "VolunteerHomePage should use OrderDetailsModal"],
  [
    /fetchAvailableOrderDetails/,
    "VolunteerHomePage should prepare detailed lookup by ID",
  ],
  [/Pedido aceito/, "VolunteerHomePage should show visible acceptance feedback"],
  [/acceptedOrderId/, "VolunteerHomePage should allow only one accepted order"],
  [
    /selectedOrderIsAccepted/,
    "VolunteerHomePage details dialog should know when selected order is accepted",
  ],
  [
    /hasAcceptedOrder/,
    "VolunteerHomePage should block accepting another order while one is accepted",
  ],
  [
    /handleUnavailableOrder/,
    "VolunteerHomePage should alert when an unavailable order is clicked",
  ],
]) {
  assert.match(page, pattern, message);
}

assert.doesNotMatch(
  page,
  /acceptedOrderIds/,
  "VolunteerHomePage should not allow multiple accepted orders",
);

const filters = readSrc("components/volunteer/VolunteerOrderFilters.jsx");

for (const text of ["Filtros", "Urgentes", "Compras", "Reparos", "Companhia"]) {
  assert.match(filters, new RegExp(text), `VolunteerOrderFilters should include ${text}`);
}

for (const [pattern, message] of [
  [/isActive/, "VolunteerOrderFilters should style the active filter"],
  [/onFilterChange/, "VolunteerOrderFilters should notify filter changes"],
  [
    /showCategoryFilters/,
    "VolunteerOrderFilters should reveal categories after pressing Filtros",
  ],
  [/filterPillIn/, "VolunteerOrderFilters should animate category filters"],
]) {
  assert.match(filters, pattern, message);
}

const orderCard = readSrc("components/volunteer/AvailableOrderCard.jsx");

for (const text of [
  "Ver mais",
  "Ajudar agora",
  "onViewDetails",
  "onAcceptOrder",
  "isAccepted",
  "isAccepting",
  "isDisabled",
  "onUnavailableOrder",
]) {
  assert.match(orderCard, new RegExp(text), `AvailableOrderCard should include ${text}`);
}

for (const [pattern, message] of [
  [/UrgencyBadge/, "AvailableOrderCard should use UrgencyBadge"],
  [/OrderMetaInfo/, "AvailableOrderCard should use OrderMetaInfo"],
  [/orderShape/, "AvailableOrderCard should expose the expected order interface"],
]) {
  assert.match(orderCard, pattern, message);
}

const orderDetailsModal = readSrc("components/volunteer/OrderDetailsModal.jsx");

for (const text of [
  "Título completo",
  "Categoria",
  "Descrição",
  "Urgência",
  "Localização aproximada",
  "Tempo de publicação",
  "Informações do idoso",
  "Fechar",
  "Ajudar agora",
]) {
  assert.match(orderDetailsModal, new RegExp(text), `OrderDetailsModal should include ${text}`);
}

const urgencyBadge = readSrc("components/volunteer/UrgencyBadge.jsx");

for (const text of [
  "high",
  "medium",
  "low",
  "ALTA URGÊNCIA",
  "MÉDIA URGÊNCIA",
  "BAIXA URGÊNCIA",
]) {
  assert.match(urgencyBadge, new RegExp(text), `UrgencyBadge should handle ${text}`);
}

const orderMetaInfo = readSrc("components/volunteer/OrderMetaInfo.jsx");

for (const text of ["distance", "neighborhood", "timeAgo"]) {
  assert.match(orderMetaInfo, new RegExp(text), `OrderMetaInfo should render ${text}`);
}

const communityCard = readSrc("components/volunteer/VolunteerCommunityCard.jsx");

for (const text of ["Comunidade Ativa", "Ver Idosos Próximos", "precisam de ajuda"]) {
  assert.match(communityCard, new RegExp(text), `VolunteerCommunityCard should include ${text}`);
}

for (const [pattern, message] of [
  [
    /nearbyEldersCount|activeElders/,
    "VolunteerCommunityCard should receive nearby elders quantity by prop",
  ],
  [/onViewElders/, "VolunteerCommunityCard should expose elders navigation callback"],
  [
    /FavoriteBorderIcon|PeopleAltOutlinedIcon/,
    "VolunteerCommunityCard should render an icon or illustration",
  ],
]) {
  assert.match(communityCard, pattern, message);
}

const layout = readSrc("components/volunteer/VolunteerLayout.jsx");

for (const [pattern, message] of [
  [/volunteerPagePaths/, "VolunteerLayout should map volunteer pages to URLs"],
  [/\/voluntario\/idosos/, "VolunteerLayout should prepare the elders route"],
  [/onNavigateToElders/, "VolunteerLayout should pass elders navigation to the home"],
]) {
  assert.match(layout, pattern, message);
}

const orders = readSrc("data/mockOrders.js");

for (const field of [
  "category",
  "categoryLabel",
  "title",
  "description",
  "distance",
  "neighborhood",
  "timeAgo",
  "urgencyLevel",
  "elderSummary",
]) {
  assert.match(orders, new RegExp(field), `mock orders should include ${field}`);
}

const availableOrdersModule = await import(
  pathToFileURL(join(src, "services/availableOrders.js")).href,
);

const volunteerStatsModule = await import(
  pathToFileURL(join(src, "services/volunteerStats.js")).href,
);

const sampleOrders = [
  {
    id: 1,
    title: "Conserto de torneira",
    description: "A cozinha está vazando",
    category: "repairs",
    categoryLabel: "Reparos",
    neighborhood: "Centro",
    urgencyTone: "high",
  },
  {
    id: 2,
    title: "Ajuda com remédios",
    description: "Buscar na farmácia",
    category: "shopping",
    categoryLabel: "Compras",
    neighborhood: "Jardins",
    urgencyTone: "low",
  },
  {
    id: 3,
    title: "Companhia para passeio",
    description: "Conversar na praça",
    category: "company",
    categoryLabel: "Companhia",
    neighborhood: "Centro",
    urgencyTone: "low",
  },
];

assert.deepEqual(
  orderIds(availableOrdersModule.searchAvailableOrders(sampleOrders, {
    searchTerm: "torneira",
  })),
  [1],
  "searchAvailableOrders should search by title",
);

assert.deepEqual(
  orderIds(availableOrdersModule.searchAvailableOrders(sampleOrders, {
    searchTerm: "farmácia",
  })),
  [2],
  "searchAvailableOrders should search by description",
);

assert.deepEqual(
  orderIds(availableOrdersModule.searchAvailableOrders(sampleOrders, {
    searchTerm: "compras",
  })),
  [2],
  "searchAvailableOrders should search by category label",
);

assert.deepEqual(
  orderIds(availableOrdersModule.searchAvailableOrders(sampleOrders, {
    searchTerm: "centro",
  })),
  [1, 3],
  "searchAvailableOrders should search by location",
);

assert.deepEqual(
  orderIds(availableOrdersModule.searchAvailableOrders(sampleOrders, {
    q: "jardins",
  })),
  [2],
  "searchAvailableOrders should accept future API q params",
);

assert.deepEqual(
  orderIds(availableOrdersModule.searchAvailableOrders(sampleOrders, {
    category: "repairs",
  })),
  [1],
  "searchAvailableOrders should accept future API category params",
);

assert.deepEqual(
  orderIds(availableOrdersModule.searchAvailableOrders(sampleOrders, {
    priority: "urgent",
  })),
  [1],
  "searchAvailableOrders should accept future API priority params",
);

assert.deepEqual(
  orderIds(availableOrdersModule.searchAvailableOrders(sampleOrders, {
    activeFilter: "company",
  })),
  [3],
  "searchAvailableOrders should filter by active category",
);

assert.deepEqual(
  availableOrdersModule.buildAvailableOrdersSearchParams({
    searchTerm: " remédio ",
    activeFilter: "urgent",
    volunteerId: 7,
  }),
  { q: "remédio", priority: "urgent", volunteerId: 7 },
  "buildAvailableOrdersSearchParams should prepare future API params",
);

assert.deepEqual(
  await availableOrdersModule.fetchAvailableOrderDetails(sampleOrders, 2),
  sampleOrders[1],
  "fetchAvailableOrderDetails should prepare future detailed lookup by ID",
);

assert.deepEqual(
  await availableOrdersModule.acceptOrder({
    orderId: 2,
    volunteerId: 7,
  }),
  { id: 2, volunteerId: 7, status: "em_andamento" },
  "acceptOrder should prepare future API acceptance",
);

await assert.rejects(
  () => availableOrdersModule.acceptOrder({ volunteerId: 7 }),
  /Pedido inválido/,
  "acceptOrder should fail for invalid order requests",
);
