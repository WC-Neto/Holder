import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const src = join(root, "src");

const requiredFiles = [
  "components/volunteer/pages/VolunteerHomePage.jsx",
  "components/volunteer/VolunteerHomeHeader.jsx",
  "components/volunteer/SearchInput.jsx",
  "components/volunteer/VolunteerOrderFilters.jsx",
  "components/volunteer/AvailableOrderCard.jsx",
  "components/volunteer/VolunteerCommunityCard.jsx",
  "components/volunteer/VolunteerStatsCard.jsx",
  "components/volunteer/LoadMoreButton.jsx",
  "data/mockOrders.js",
  "services/availableOrders.js",
];

for (const file of requiredFiles) {
  assert.equal(existsSync(join(src, file)), true, `${file} should exist`);
}

const readSrc = (file) => readFileSync(join(src, file), "utf8");

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

assert.match(page, /searchTerm/, "VolunteerHomePage should keep searchTerm state");
assert.match(page, /debouncedSearchTerm/, "VolunteerHomePage should debounce search input");
assert.match(page, /activeFilter/, "VolunteerHomePage should keep active filter state");
assert.match(page, /searchAvailableOrders/, "VolunteerHomePage should use searchAvailableOrders");
assert.match(page, /VolunteerOrderFilters/, "VolunteerHomePage should use VolunteerOrderFilters");

const filters = readSrc("components/volunteer/VolunteerOrderFilters.jsx");
for (const text of ["Filtros", "Urgentes", "Compras", "Reparos", "Companhia"]) {
  assert.match(filters, new RegExp(text), `VolunteerOrderFilters should include ${text}`);
}

assert.match(filters, /isActive/, "VolunteerOrderFilters should style the active filter");
assert.match(filters, /onFilterChange/, "VolunteerOrderFilters should notify filter changes");
assert.match(
  filters,
  /showCategoryFilters/,
  "VolunteerOrderFilters should reveal category filters only after pressing Filtros",
);
assert.match(
  filters,
  /filterPillIn/,
  "VolunteerOrderFilters should animate category filters when they appear",
);

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
]) {
  assert.match(orders, new RegExp(field), `mock orders should include ${field}`);
}

const availableOrdersModule = await import(
  pathToFileURL(join(src, "services/availableOrders.js")).href
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
  availableOrdersModule.searchAvailableOrders(sampleOrders, { searchTerm: "torneira" }).map(
    (order) => order.id,
  ),
  [1],
  "searchAvailableOrders should search by title",
);

assert.deepEqual(
  availableOrdersModule.searchAvailableOrders(sampleOrders, { searchTerm: "farmácia" }).map(
    (order) => order.id,
  ),
  [2],
  "searchAvailableOrders should search by description",
);

assert.deepEqual(
  availableOrdersModule.searchAvailableOrders(sampleOrders, { searchTerm: "compras" }).map(
    (order) => order.id,
  ),
  [2],
  "searchAvailableOrders should search by category label",
);

assert.deepEqual(
  availableOrdersModule.searchAvailableOrders(sampleOrders, { searchTerm: "centro" }).map(
    (order) => order.id,
  ),
  [1, 3],
  "searchAvailableOrders should search by location",
);

assert.deepEqual(
  availableOrdersModule.searchAvailableOrders(sampleOrders, { q: "jardins" }).map(
    (order) => order.id,
  ),
  [2],
  "searchAvailableOrders should accept future API q params",
);

assert.deepEqual(
  availableOrdersModule.searchAvailableOrders(sampleOrders, { category: "repairs" }).map(
    (order) => order.id,
  ),
  [1],
  "searchAvailableOrders should accept future API category params",
);

assert.deepEqual(
  availableOrdersModule.searchAvailableOrders(sampleOrders, { priority: "urgent" }).map(
    (order) => order.id,
  ),
  [1],
  "searchAvailableOrders should accept future API priority params",
);

assert.deepEqual(
  availableOrdersModule.searchAvailableOrders(sampleOrders, { activeFilter: "company" }).map(
    (order) => order.id,
  ),
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
