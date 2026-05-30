import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const src = join(root, "src");

const requiredFiles = [
  "components/volunteer/pages/VolunteerHomePage.jsx",
  "components/volunteer/VolunteerHomeHeader.jsx",
  "components/volunteer/SearchInput.jsx",
  "components/volunteer/OrderFilterTabs.jsx",
  "components/volunteer/AvailableOrderCard.jsx",
  "components/volunteer/VolunteerCommunityCard.jsx",
  "components/volunteer/VolunteerStatsCard.jsx",
  "components/volunteer/LoadMoreButton.jsx",
  "data/mockOrders.js",
];

for (const file of requiredFiles) {
  assert.equal(existsSync(join(src, file)), true, `${file} should exist`);
}

const readSrc = (file) => readFileSync(join(src, file), "utf8");

const page = readSrc("components/volunteer/pages/VolunteerHomePage.jsx");
for (const text of [
  "Pedidos Disponíveis",
  "Buscar pedidos perto de você...",
  "Filtros",
  "Urgentes",
  "Compras",
  "Reparos",
  "Companhia",
  "Carregar mais",
  "Comunidade Ativa",
  "Ver Idosos Próximos",
  "Suas Estatísticas",
]) {
  assert.match(page, new RegExp(text), `VolunteerHomePage should include ${text}`);
}

const orders = readSrc("data/mockOrders.js");
for (const field of [
  "category",
  "title",
  "description",
  "distance",
  "neighborhood",
  "timeAgo",
  "urgencyLevel",
]) {
  assert.match(orders, new RegExp(field), `mock orders should include ${field}`);
}
