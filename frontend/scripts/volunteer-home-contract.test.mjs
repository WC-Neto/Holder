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
  "components/volunteer/pages/VolunteerProfilePage.jsx",
  "components/volunteer/VolunteerProfileCard.jsx",
  "components/volunteer/EditVolunteerProfileForm.jsx",
  "components/volunteer/VolunteerProfileStats.jsx",
  "components/volunteer/AvailabilityTags.jsx",
  "components/volunteer/AvailabilityCard.jsx",
  "components/volunteer/PersonalInfoList.jsx",
  "components/volunteer/EditAvailabilityForm.jsx",
  "components/volunteer/VolunteerSettingsMenu.jsx",
  "components/volunteer/SettingsMenuItem.jsx",
  "components/volunteer/VolunteerSettingsList.jsx",
  "components/volunteer/SettingsItem.jsx",
  "components/volunteer/LogoutSettingsItem.jsx",
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
  "data/mockVolunteerProfile.js",
  "data/mockNearbyElderly.js",
  "data/mockVolunteerStats.js",
  "services/authSession.js",
  "services/availableOrders.js",
  "services/volunteerHistory.js",
  "services/volunteerProfile.js",
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
  [/\/login/, "VolunteerLayout should prepare login redirect"],
  [/onNavigateToElders/, "VolunteerLayout should pass elders navigation to the home"],
  [/isLogoutConfirmOpen/, "VolunteerLayout should confirm logout before ending session"],
  [/handleLogoutRequest/, "VolunteerLayout should reuse logout request from sidebar and profile"],
  [/handleConfirmLogout/, "VolunteerLayout should execute confirmed logout"],
  [/VolunteerHistoryPage/, "VolunteerLayout should render volunteer history page"],
  [/VolunteerProfilePage/, "VolunteerLayout should render volunteer profile page"],
]) {
  assert.match(layout, pattern, message);
}

const profilePage = readSrc("components/volunteer/pages/VolunteerProfilePage.jsx");

for (const text of [
  "Configurações",
  "Sair da Conta",
  "Versão 1.0.0",
]) {
  assert.match(profilePage, new RegExp(text), `VolunteerProfilePage should include ${text}`);
}

for (const [pattern, message] of [
  [/getVolunteerProfile/, "VolunteerProfilePage should load volunteer profile"],
  [/updateVolunteerProfile/, "VolunteerProfilePage should save profile updates"],
  [/updateVolunteerAvailability/, "VolunteerProfilePage should save availability updates"],
  [/isEditProfileOpen/, "VolunteerProfilePage should open edit profile modal"],
  [/isEditAvailabilityOpen/, "VolunteerProfilePage should open availability edit modal"],
  [/isSavingProfile/, "VolunteerProfilePage should track save loading"],
  [/isSavingAvailability/, "VolunteerProfilePage should track availability save loading"],
  [/profileFeedback/, "VolunteerProfilePage should show success and error feedback"],
  [/handleEditProfile/, "VolunteerProfilePage should handle edit profile action"],
  [/handleSaveProfile/, "VolunteerProfilePage should handle profile save"],
  [/handleSaveAvailability/, "VolunteerProfilePage should handle availability save"],
  [/VolunteerProfileCard/, "VolunteerProfilePage should render profile card"],
  [/EditVolunteerProfileForm/, "VolunteerProfilePage should render edit form"],
  [/EditAvailabilityForm/, "VolunteerProfilePage should render availability form"],
  [/VolunteerSettingsMenu/, "VolunteerProfilePage should render settings menu"],
  [/profileData/, "VolunteerProfilePage should keep profile data state"],
]) {
  assert.match(profilePage, pattern, message);
}

const profileCard = readSrc("components/volunteer/VolunteerProfileCard.jsx");

for (const text of ["Voluntário Ativo", "Editar Perfil", "Disponibilidade", "Informações Pessoais"]) {
  assert.match(profileCard, new RegExp(text), `VolunteerProfileCard should include ${text}`);
}

for (const [pattern, message] of [
  [/VolunteerProfileStats/, "VolunteerProfileCard should render volunteer stats"],
  [/AvailabilityTags/, "VolunteerProfileCard should render availability tags"],
  [/PersonalInfoList/, "VolunteerProfileCard should render personal info"],
  [/onEditProfile/, "VolunteerProfileCard should expose edit profile callback"],
  [/avatarUrl/, "VolunteerProfileCard should show volunteer photo"],
]) {
  assert.match(profileCard, pattern, message);
}

const editProfileForm = readSrc("components/volunteer/EditVolunteerProfileForm.jsx");

for (const text of [
  "Foto",
  "Nome",
  "Telefone",
  "Endereço",
  "Disponibilidade",
  "Salvar alterações",
  "Cancelar",
]) {
  assert.match(editProfileForm, new RegExp(text), `EditVolunteerProfileForm should include ${text}`);
}

for (const [pattern, message] of [
  [/profile/, "EditVolunteerProfileForm should receive current profile data"],
  [/formData/, "EditVolunteerProfileForm should keep editable form data"],
  [/avatarUrl/, "EditVolunteerProfileForm should prepare photo editing"],
  [/type="file"/, "EditVolunteerProfileForm should allow choosing a local image"],
  [/imagePreview/, "EditVolunteerProfileForm should show selected image preview"],
  [/objectPosition/, "EditVolunteerProfileForm should allow adjusting image center"],
  [/handleAvatarDragStart/, "EditVolunteerProfileForm should let users drag the photo preview"],
  [/formatPhoneNumber/, "EditVolunteerProfileForm should format phone while typing"],
  [/validateProfileForm/, "EditVolunteerProfileForm should validate profile fields before saving"],
  [/nameError/, "EditVolunteerProfileForm should validate volunteer name"],
  [/phoneError/, "EditVolunteerProfileForm should validate volunteer phone"],
  [/availabilityError/, "EditVolunteerProfileForm should require at least one availability period"],
  [/availabilityOptions/, "EditVolunteerProfileForm should reuse availability selection"],
  [/onSave/, "EditVolunteerProfileForm should expose save callback"],
  [/isSaving/, "EditVolunteerProfileForm should show loading state"],
]) {
  assert.match(editProfileForm, pattern, message);
}

assert.doesNotMatch(
  editProfileForm,
  /Slider|Centro horizontal|Centro vertical/,
  "EditVolunteerProfileForm should not use separate image adjustment buttons or sliders",
);

const profileStats = readSrc("components/volunteer/VolunteerProfileStats.jsx");

for (const text of ["Ajudas", "Idosos", "Avaliação"]) {
  assert.match(profileStats, new RegExp(text), `VolunteerProfileStats should include ${text}`);
}

const availabilityTags = readSrc("components/volunteer/AvailabilityTags.jsx");

for (const text of ["Manhã", "Tarde", "Noite"]) {
  assert.match(availabilityTags, new RegExp(text), `AvailabilityTags should include ${text}`);
}

const availabilityCard = readSrc("components/volunteer/AvailabilityCard.jsx");

for (const text of ["period", "selected", "onToggle"]) {
  assert.match(availabilityCard, new RegExp(text), `AvailabilityCard should include ${text}`);
}

for (const [pattern, message] of [
  [/LightModeOutlinedIcon/, "AvailabilityCard should render morning icon"],
  [/WbTwilightOutlinedIcon/, "AvailabilityCard should render afternoon icon"],
  [/NightsStayOutlinedIcon/, "AvailabilityCard should render night icon"],
  [/aria-pressed/, "AvailabilityCard should expose selected state accessibly"],
]) {
  assert.match(availabilityCard, pattern, message);
}

const editAvailabilityForm = readSrc("components/volunteer/EditAvailabilityForm.jsx");

for (const text of ["Manhã", "Tarde", "Noite", "Salvar alterações", "Cancelar"]) {
  assert.match(
    editAvailabilityForm,
    new RegExp(text),
    `EditAvailabilityForm should include ${text}`,
  );
}

for (const [pattern, message] of [
  [/selectedAvailability/, "EditAvailabilityForm should keep selected availability state"],
  [/AvailabilityCard/, "EditAvailabilityForm should reuse AvailabilityCard"],
  [/validateAvailabilitySelection/, "EditAvailabilityForm should validate at least one period"],
  [/onSave/, "EditAvailabilityForm should expose save callback"],
  [/isSaving/, "EditAvailabilityForm should show loading state"],
]) {
  assert.match(editAvailabilityForm, pattern, message);
}

const personalInfoList = readSrc("components/volunteer/PersonalInfoList.jsx");

for (const text of ["phone", "address", "birthDate"]) {
  assert.match(personalInfoList, new RegExp(text), `PersonalInfoList should include ${text}`);
}

const settingsMenu = readSrc("components/volunteer/VolunteerSettingsMenu.jsx");

for (const text of ["Notificações", "Disponibilidade", "Privacidade", "Ajuda e Suporte"]) {
  assert.match(settingsMenu, new RegExp(text), `VolunteerSettingsMenu should include ${text}`);
}

for (const [pattern, message] of [
  [/settingsMenuOptions/, "VolunteerSettingsMenu should expose configurable options"],
  [/SettingsMenuItem/, "VolunteerSettingsMenu should render SettingsMenuItem"],
  [/onNavigate/, "VolunteerSettingsMenu should prepare navigation callbacks"],
  [/route/, "VolunteerSettingsMenu should prepare future routes"],
  [/onLogout/, "VolunteerSettingsMenu should implement logout action"],
  [/destructive/, "VolunteerSettingsMenu should style logout as destructive"],
]) {
  assert.match(settingsMenu, pattern, message);
}

const settingsMenuItem = readSrc("components/volunteer/SettingsMenuItem.jsx");

for (const text of ["title", "description", "icon", "onClick", "ChevronRightIcon"]) {
  assert.match(settingsMenuItem, new RegExp(text), `SettingsMenuItem should include ${text}`);
}

for (const [pattern, message] of [
  [/isDestructive/, "SettingsMenuItem should support destructive styling"],
  [/aria-label/, "SettingsMenuItem should expose accessible action labels"],
  [/&:hover/, "SettingsMenuItem should provide hover state"],
  [/&:focus-within/, "SettingsMenuItem should provide focus state"],
]) {
  assert.match(settingsMenuItem, pattern, message);
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

const volunteerProfileModule = await import(
  pathToFileURL(join(src, "services/volunteerProfile.js")).href,
);

const authSessionModule = await import(
  pathToFileURL(join(src, "services/authSession.js")).href,
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

const volunteerProfile = await volunteerProfileModule.getVolunteerProfile({
  volunteerId: 7,
});

assert.equal(
  volunteerProfile.name,
  "Ana Santos",
  "getVolunteerProfile should load mocked volunteer profile",
);

assert.deepEqual(
  volunteerProfileModule.buildVolunteerProfileQueryParams({ volunteerId: 7 }),
  { volunteerId: 7 },
  "buildVolunteerProfileQueryParams should prepare future profile API params",
);

assert.deepEqual(
  await volunteerProfileModule.updateVolunteerProfile({
    volunteerId: 7,
    updates: {
      name: "Ana Maria",
      personalInfo: { phone: "(11) 98888-0000" },
      availability: ["Manhã", "Noite"],
    },
  }),
  {
    ...volunteerProfile,
    name: "Ana Maria",
    personalInfo: {
      ...volunteerProfile.personalInfo,
      phone: "(11) 98888-0000",
    },
    availability: ["Manhã", "Noite"],
  },
  "updateVolunteerProfile should merge mocked profile updates",
);

const removedLocalKeys = [];
const removedSessionKeys = [];
const fakeLocalStorage = {
  removeItem: (key) => removedLocalKeys.push(key),
};
const fakeSessionStorage = {
  removeItem: (key) => removedSessionKeys.push(key),
};
const fakeWindow = {
  location: { pathname: "/voluntario/perfil" },
  history: {
    replaceState: (_, __, nextPath) => {
      fakeWindow.location.pathname = nextPath;
    },
  },
};

assert.deepEqual(
  authSessionModule.logout({
    localStorage: fakeLocalStorage,
    sessionStorage: fakeSessionStorage,
    windowRef: fakeWindow,
  }),
  { redirectTo: "/login" },
  "logout should redirect to login",
);

assert.deepEqual(
  removedLocalKeys,
  ["token", "idoso_id_manual", "user", "volunteer_user", "auth_user"],
  "logout should clear sensitive local storage keys",
);

assert.deepEqual(
  removedSessionKeys,
  ["token", "idoso_id_manual", "user", "volunteer_user", "auth_user"],
  "logout should clear sensitive session storage keys",
);

assert.equal(
  fakeWindow.location.pathname,
  "/login",
  "logout should update browser path to login",
);

assert.deepEqual(
  await volunteerProfileModule.updateVolunteerAvailability({
    volunteerId: 7,
    availability: ["Tarde", "Noite"],
  }),
  {
    ...volunteerProfile,
    availability: ["Tarde", "Noite"],
  },
  "updateVolunteerAvailability should update mocked availability",
);

await assert.rejects(
  () =>
    volunteerProfileModule.updateVolunteerAvailability({
      volunteerId: 7,
      availability: [],
    }),
  /Selecione pelo menos um período/,
  "updateVolunteerAvailability should require at least one period",
);

await assert.rejects(
  () =>
    volunteerProfileModule.updateVolunteerProfile({
      volunteerId: 7,
      updates: { availability: [] },
    }),
  /Selecione pelo menos um período/,
  "updateVolunteerProfile should not allow empty availability",
);

await assert.rejects(
  () => volunteerProfileModule.updateVolunteerProfile({ updates: { name: "" } }),
  /Voluntário inválido/,
  "updateVolunteerProfile should validate volunteer id",
);

await assert.rejects(
  () =>
    volunteerProfileModule.updateVolunteerProfile({
      volunteerId: 7,
      updates: { name: "A" },
    }),
  /Nome inválido/,
  "updateVolunteerProfile should validate volunteer name",
);

await assert.rejects(
  () =>
    volunteerProfileModule.updateVolunteerProfile({
      volunteerId: 7,
      updates: { personalInfo: { phone: "123" } },
    }),
  /Telefone inválido/,
  "updateVolunteerProfile should validate volunteer phone",
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
