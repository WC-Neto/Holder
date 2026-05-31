import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const src = join(root, "src");

const readSrc = (file) => readFileSync(join(src, file), "utf8");
const orderIds = (orders) => orders.map((order) => order.id);

const requiredFiles = [
  "components/volunteer/VolunteerLayout.jsx",
  "components/volunteer/pages/VolunteerHomePage.jsx",
  "components/volunteer/pages/VolunteerHistoryPage.jsx",
  "components/volunteer/pages/VolunteerElderlyNearbyPage.jsx",
  "components/volunteer/VolunteerHistorySummary.jsx",
  "components/volunteer/VolunteerHistoryFilters.jsx",
  "components/volunteer/VolunteerHistoryStatusTabs.jsx",
  "components/volunteer/VolunteerHistoryCard.jsx",
  "components/volunteer/NearbyElderlyBanner.jsx",
  "components/volunteer/NearbyElderlyCard.jsx",
  "components/volunteer/NearbyElderlyDetailsModal.jsx",
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
  "data/mockVolunteerHistory.js",
  "data/mockNearbyElderly.js",
  "data/mockVolunteerStats.js",
  "services/availableOrders.js",
  "services/volunteerHistory.js",
  "services/nearbyElderly.js",
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
  [/acceptOrder/, "VolunteerHomePage should accept an order through the service"],
  [/availableOrders/, "VolunteerHomePage should keep a local available orders list"],
  [/acceptedOrderStatus/, "VolunteerHomePage should keep accepted order status"],
  [/setFeedbackSeverity/, "VolunteerHomePage should show success and error feedback"],
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
  [/VolunteerHistoryPage/, "VolunteerLayout should render volunteer history page"],
]) {
  assert.match(layout, pattern, message);
}

const historyPage = readSrc("components/volunteer/pages/VolunteerHistoryPage.jsx");

for (const text of [
  "Meu Histórico",
  "Veja todas as pessoas que você ajudou",
  "Nenhuma ajuda encontrada",
]) {
  assert.match(historyPage, new RegExp(text), `VolunteerHistoryPage should include ${text}`);
}

for (const [pattern, message] of [
  [/getVolunteerHistory/, "VolunteerHistoryPage should load volunteer history"],
  [/activeHistoryFilter/, "VolunteerHistoryPage should keep active filter state"],
  [/filteredHistory/, "VolunteerHistoryPage should filter history locally"],
  [/selectedHistoryItem/, "VolunteerHistoryPage should keep selected item for details"],
  [/handleViewHistoryDetails/, "VolunteerHistoryPage should implement details click"],
  [/handleContactElderly/, "VolunteerHistoryPage should implement contact action"],
  [/VolunteerHistorySummary/, "VolunteerHistoryPage should render summary"],
  [/VolunteerHistoryStatusTabs/, "VolunteerHistoryPage should render status tabs"],
  [/VolunteerHistoryCard/, "VolunteerHistoryPage should render cards"],
]) {
  assert.match(historyPage, pattern, message);
}

const historySummary = readSrc("components/volunteer/VolunteerHistorySummary.jsx");

for (const text of ["Total de ajudas", "Concluídas"]) {
  assert.match(historySummary, new RegExp(text), `VolunteerHistorySummary should include ${text}`);
}

const historyFilters = readSrc("components/volunteer/VolunteerHistoryFilters.jsx");
const historyStatusTabs = readSrc("components/volunteer/VolunteerHistoryStatusTabs.jsx");

for (const text of ["Todos", "Em Andamento", "Concluídos"]) {
  assert.match(historyFilters, new RegExp(text), `VolunteerHistoryFilters should include ${text}`);
  assert.match(historyStatusTabs, new RegExp(text), `VolunteerHistoryStatusTabs should include ${text}`);
}

for (const [pattern, message] of [
  [/historyStatusOptions/, "VolunteerHistoryStatusTabs should expose status options enum"],
  [/isActive/, "VolunteerHistoryStatusTabs should style the active filter"],
  [/onStatusChange/, "VolunteerHistoryStatusTabs should notify filter changes"],
  [/aria-pressed/, "VolunteerHistoryStatusTabs should expose active state accessibly"],
]) {
  assert.match(historyStatusTabs, pattern, message);
}

const historyCard = readSrc("components/volunteer/VolunteerHistoryCard.jsx");

for (const text of [
  "elderName",
  "neighborhood",
  "date",
  "status",
  "onContact",
  "onViewDetails",
]) {
  assert.match(historyCard, new RegExp(text), `VolunteerHistoryCard should include ${text}`);
}

for (const [pattern, message] of [
  [/categoryIcons/, "VolunteerHistoryCard should render category icon"],
  [/ChatBubbleOutlineIcon/, "VolunteerHistoryCard should render contact action"],
  [/ChevronRightIcon/, "VolunteerHistoryCard should render details arrow"],
]) {
  assert.match(historyCard, pattern, message);
}

const elderlyNearbyPage = readSrc(
  "components/volunteer/pages/VolunteerElderlyNearbyPage.jsx",
);

for (const text of [
  "Idosos Próximos",
  "Encontre idosos que precisam de ajuda",
  "Nenhum idoso próximo encontrado",
]) {
  assert.match(
    elderlyNearbyPage,
    new RegExp(text),
    `VolunteerElderlyNearbyPage should include ${text}`,
  );
}

for (const [pattern, message] of [
  [/getNearbyElderly/, "VolunteerElderlyNearbyPage should load nearby elderly"],
  [/isLoadingNearbyElderly/, "VolunteerElderlyNearbyPage should handle loading state"],
  [/nearbyElderly/, "VolunteerElderlyNearbyPage should keep nearby elderly state"],
  [/favoriteElderlyIds/, "VolunteerElderlyNearbyPage should keep interest state"],
  [/selectedElderlyId/, "VolunteerElderlyNearbyPage should keep selected elderly state"],
  [/selectedElderly/, "VolunteerElderlyNearbyPage should keep selected elderly details"],
  [/isDetailsOpen/, "VolunteerElderlyNearbyPage should open elderly details"],
  [/handleContactElderly/, "VolunteerElderlyNearbyPage should implement contact action"],
  [/handleSelectElderly/, "VolunteerElderlyNearbyPage should react when elderly card data is clicked"],
  [/handleCloseDetails/, "VolunteerElderlyNearbyPage should close elderly details"],
  [/handleToggleInterest/, "VolunteerElderlyNearbyPage should implement interest action"],
  [/NearbyElderlyBanner/, "VolunteerElderlyNearbyPage should use the info banner"],
  [/NearbyElderlyCard/, "VolunteerElderlyNearbyPage should use elderly cards"],
  [/NearbyElderlyDetailsModal/, "VolunteerElderlyNearbyPage should show elderly details modal"],
  [/onClick={handleSelectElderly}/, "VolunteerElderlyNearbyPage should pass card click action"],
]) {
  assert.match(elderlyNearbyPage, pattern, message);
}

const elderlyDetailsModal = readSrc("components/volunteer/NearbyElderlyDetailsModal.jsx");

for (const text of [
  "Detalhes do idoso",
  "Idade",
  "Distância aproximada",
  "Localização",
  "Necessidade atual",
  "Fechar",
  "Enviar mensagem",
]) {
  assert.match(
    elderlyDetailsModal,
    new RegExp(text),
    `NearbyElderlyDetailsModal should include ${text}`,
  );
}

for (const [pattern, message] of [
  [/onClose/, "NearbyElderlyDetailsModal should expose close callback"],
  [/onContact/, "NearbyElderlyDetailsModal should expose contact callback"],
  [/Avatar/, "NearbyElderlyDetailsModal should show elderly photo"],
]) {
  assert.match(elderlyDetailsModal, pattern, message);
}

const nearbyBanner = readSrc("components/volunteer/NearbyElderlyBanner.jsx");

for (const text of ["idosos precisam de ajuda perto de você", "nearbyCount"]) {
  assert.match(nearbyBanner, new RegExp(text), `NearbyElderlyBanner should include ${text}`);
}

const elderlyCard = readSrc("components/volunteer/NearbyElderlyCard.jsx");

for (const text of [
  "NearbyElderlyCard",
  "nearbyElderlyShape",
  "photoUrl",
  "name",
  "distance",
  "onClick",
  "onContact",
  "onToggleInterest",
  "isSelected",
  "isInterested",
]) {
  assert.match(elderlyCard, new RegExp(text), `NearbyElderlyCard should include ${text}`);
}

for (const [pattern, message] of [
  [/ChatBubbleOutlineIcon/, "NearbyElderlyCard should include a message icon"],
  [/PlaceOutlinedIcon/, "NearbyElderlyCard should include a location icon"],
  [/FavoriteBorderIcon|FavoriteIcon/, "NearbyElderlyCard should include a heart icon"],
  [/&:hover/, "NearbyElderlyCard should provide hover state"],
  [/&:focus-within/, "NearbyElderlyCard should provide focus state"],
  [/cursor: "pointer"/, "NearbyElderlyCard should be clickable"],
]) {
  assert.match(elderlyCard, pattern, message);
}

const nearbyElderlyMock = readSrc("data/mockNearbyElderly.js");

for (const field of ["photoUrl", "name", "distance", "age", "neighborhood", "helpSummary", "needsHelp"]) {
  assert.match(nearbyElderlyMock, new RegExp(field), `mock nearby elderly should include ${field}`);
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

const volunteerHistoryModule = await import(
  pathToFileURL(join(src, "services/volunteerHistory.js")).href,
);

const volunteerStatsModule = await import(
  pathToFileURL(join(src, "services/volunteerStats.js")).href,
);

const nearbyElderlyModule = await import(
  pathToFileURL(join(src, "services/nearbyElderly.js")).href,
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

const volunteerHistory = await volunteerHistoryModule.getVolunteerHistory({
  volunteerId: 7,
});

assert.equal(
  volunteerHistory.length,
  2,
  "getVolunteerHistory should load mocked volunteer history",
);

assert.deepEqual(
  volunteerHistoryModule.filterVolunteerHistory(volunteerHistory, "in_progress").map(
    (historyItem) => historyItem.id,
  ),
  [1],
  "filterVolunteerHistory should filter in-progress history",
);

assert.deepEqual(
  volunteerHistoryModule.getVolunteerHistorySummary(volunteerHistory),
  { total: 2, completed: 1 },
  "getVolunteerHistorySummary should calculate history indicators",
);

assert.deepEqual(
  volunteerHistoryModule.buildVolunteerHistoryQueryParams({
    volunteerId: 7,
    activeHistoryFilter: "completed",
  }),
  { volunteerId: 7, status: "completed" },
  "buildVolunteerHistoryQueryParams should prepare future API status params",
);

const nearbyElderly = await nearbyElderlyModule.getNearbyElderly({
  volunteerId: 7,
});

assert.equal(
  nearbyElderly.length,
  3,
  "getNearbyElderly should load mocked nearby elderly",
);

assert.deepEqual(
  await nearbyElderlyModule.getNearbyElderly({ volunteerId: 7, empty: true }),
  [],
  "getNearbyElderly should support empty state",
);
