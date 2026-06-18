import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import AvailableOrderCard from "../AvailableOrderCard";
import EmptyState from "../EmptyState";
import ErrorState from "../ErrorState";
import FinishHelpReportModal from "../FinishHelpReportModal";
import LoadMoreButton from "../LoadMoreButton";
import LoadingState from "../LoadingState";
import OrderDetailsModal from "../OrderDetailsModal";
import SearchInput from "../SearchInput";
import CommunityCard from "../../shared/CommunityCard";
import VolunteerHomeHeader from "../VolunteerHomeHeader";
import VolunteerOrderFilters from "../VolunteerOrderFilters";
import StatsCard from "../../shared/StatsCard";
import {
  acceptOrder,
  buildAvailableOrdersSearchParams,
  fetchAvailableOrderDetails,
  finishOrder,
  searchAvailableOrders,
} from "../../../services/availableOrders";
import { fetchVolunteerStats, normalizeVolunteerStats } from "../../../services/volunteerStats";
import { getAvailableOrders as requestAvailableOrders } from "../../../services/volunteerService";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const INITIAL_VISIBLE_ORDERS = 3;
const LOAD_MORE_STEP = 3;
const SEARCH_DEBOUNCE_MS = 300;
const MOCK_VOLUNTEER_ID = 1;
const INITIAL_VOLUNTEER_STATS = {
  peopleHelped: 0,
  completedOrders: 0,
  averageRating: 0,
};

const pageCopy = {
  title: "Pedidos Disponíveis",
  searchPlaceholder: "Buscar pedidos perto de você...",
  filters: ["Filtros", "Urgentes", "Compras", "Reparos", "Companhia"],
  loadMore: "Carregar mais",
  communityTitle: "Comunidade Ativa",
  eldersButton: "Ver Idosos Próximos",
  statsTitle: "Suas Estatísticas",
};

function VolunteerHomePage({
  nearbyEldersCount = 3,
  onNavigateToElders,
  isDarkMode = false,
  onToggleTheme,
}) {
  const [availableOrders, setAvailableOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [displayedCount, setDisplayedCount] = useState(INITIAL_VISIBLE_ORDERS);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [ordersError, setOrdersError] = useState("");
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderToAccept, setOrderToAccept] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);
  const [isFinishReportOpen, setIsFinishReportOpen] = useState(false);
  const [acceptingOrderId, setAcceptingOrderId] = useState(null);
  const [finishingOrderId, setFinishingOrderId] = useState(null);
  const [acceptedOrderId, setAcceptedOrderId] = useState(null);
  const [acceptedOrderStatus, setAcceptedOrderStatus] = useState(null);
  const [orderToFinish, setOrderToFinish] = useState(null);
  const [volunteerStats, setVolunteerStats] = useState(INITIAL_VOLUNTEER_STATS);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackSeverity, setFeedbackSeverity] = useState("success");

  const loadAvailableOrders = async () => {
    setIsLoadingOrders(true);
    setOrdersError("");

    const response = await requestAvailableOrders({
      volunteerId: MOCK_VOLUNTEER_ID,
    });

    if (response.success) {
      setAvailableOrders(response.data);
    } else {
      setAvailableOrders([]);
      setOrdersError(response.error ?? "Não foi possível carregar os pedidos.");
    }

    setIsLoadingOrders(false);
  };

  const handleRetryLoadOrders = () => {
    loadAvailableOrders();
  };

  useEffect(() => {
    let isMounted = true;

    requestAvailableOrders({ volunteerId: MOCK_VOLUNTEER_ID }).then((response) => {
      if (!isMounted) {
        return;
      }

      if (response.success) {
        setAvailableOrders(response.data);
      } else {
        setAvailableOrders([]);
        setOrdersError(response.error ?? "Não foi possível carregar os pedidos.");
      }

      setIsLoadingOrders(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const debounceId = window.setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(debounceId);
  }, [searchTerm]);

  useEffect(() => {
    let isMounted = true;

    fetchVolunteerStats({ volunteerId: MOCK_VOLUNTEER_ID }).then((stats) => {
      if (isMounted) {
        setVolunteerStats(stats);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const availableOrderSearchParams = useMemo(
    () =>
      buildAvailableOrdersSearchParams({
        searchTerm: debouncedSearchTerm,
        activeFilter,
        volunteerId: MOCK_VOLUNTEER_ID,
      }),
    [activeFilter, debouncedSearchTerm],
  );

  const filteredOrders = useMemo(
    () => searchAvailableOrders(availableOrders, availableOrderSearchParams),
    [availableOrderSearchParams, availableOrders],
  );

  useEffect(() => {
    setDisplayedCount(INITIAL_VISIBLE_ORDERS);
  }, [activeFilter, debouncedSearchTerm]);

  const visibleOrders = filteredOrders.slice(0, displayedCount);
  const hasMoreOrders = filteredOrders.length > displayedCount;
  const hasAcceptedOrder = Boolean(acceptedOrderId);
  const selectedOrderIsAccepted =
    Boolean(selectedOrder) && selectedOrder.id === acceptedOrderId;
  const dashboardSummary = {
    nearbyEldersNeedingHelp: nearbyEldersCount,
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setDisplayedCount(INITIAL_VISIBLE_ORDERS);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    window.setTimeout(() => {
      setDisplayedCount((current) => current + LOAD_MORE_STEP);
      setIsLoadingMore(false);
    }, 250);
  };

  const handleViewDetails = async (order) => {
    const detailedOrder = await fetchAvailableOrderDetails(availableOrders, order.id);
    setSelectedOrder(detailedOrder ?? order);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
  };

  const handleAcceptOrder = (order) => {
    if (hasAcceptedOrder && order.id !== acceptedOrderId) {
      setFeedbackSeverity("warning");
      setFeedbackMessage(
        "Você já aceitou um pedido. Finalize-o antes de aceitar outro.",
      );
      return;
    }

    if (order.id === acceptedOrderId) {
      setFeedbackSeverity("warning");
      setFeedbackMessage("Este pedido já está aceito por você.");
      return;
    }

    setOrderToAccept(order);
    setIsAcceptDialogOpen(true);
  };

  const handleFinishOrder = (order) => {
    if (order.id !== acceptedOrderId) {
      handleUnavailableOrder();
      return;
    }

    setOrderToFinish(order);
    setIsFinishReportOpen(true);
  };

  const handleUnavailableOrder = () => {
    setFeedbackSeverity("warning");
    setFeedbackMessage(
      "Existe uma atividade em andamento. Finalize-a antes de aceitar outro pedido.",
    );
  };

  const handleCloseAcceptDialog = () => {
    if (!acceptingOrderId) {
      setIsAcceptDialogOpen(false);
    }
  };

  const handleConfirmAcceptOrder = async () => {
    if (!orderToAccept) {
      return;
    }

    const orderId = orderToAccept.id;
    setAcceptingOrderId(orderId);

    try {
      const acceptedOrder = await acceptOrder({
        orderId,
        volunteerId: MOCK_VOLUNTEER_ID,
      });

      setAcceptedOrderId(orderId);
      setAcceptedOrderStatus(acceptedOrder.status);
      setFeedbackSeverity("success");
      setFeedbackMessage(`Pedido aceito: ${orderToAccept.title}`);
      setIsAcceptDialogOpen(false);
      setOrderToAccept(null);
    } catch (error) {
      setFeedbackSeverity("error");
      setFeedbackMessage(
        error?.message ?? "Não foi possível aceitar o pedido.",
      );
    } finally {
      setAcceptingOrderId(null);
    }
  };

  const handleCloseFinishReport = () => {
    if (!finishingOrderId) {
      setIsFinishReportOpen(false);
      setOrderToFinish(null);
    }
  };

  const handleConfirmFinishOrder = async (report) => {
    if (!orderToFinish) {
      return;
    }

    const orderId = orderToFinish.id;
    setFinishingOrderId(orderId);

    try {
      await finishOrder({
        orderId,
        volunteerId: MOCK_VOLUNTEER_ID,
        report,
      });

      setAvailableOrders((currentOrders) =>
        currentOrders.filter((order) => order.id !== orderId),
      );
      setAcceptedOrderId(null);
      setAcceptedOrderStatus(null);
      setFeedbackSeverity("success");
      setFeedbackMessage(`Ajuda finalizada: ${orderToFinish.title}`);
      setIsFinishReportOpen(false);
      setOrderToFinish(null);
      if (selectedOrder?.id === orderId) {
        setIsDetailsOpen(false);
        setSelectedOrder(null);
      }
    } catch (error) {
      setFeedbackSeverity("error");
      setFeedbackMessage(
        error?.message ?? "Não foi possível finalizar a ajuda.",
      );
    } finally {
      setFinishingOrderId(null);
    }
  };

  const handleViewElders = () => {
    onNavigateToElders?.();
  };

  return (
    <Grid
      sx={{
        px: { xs: 2, md: 4 },
        py: { xs: 3, md: 3.5 },
        minHeight: "100vh",
        bgcolor: isDarkMode ? "#0f172a" : "#fbfbfc",
        maxWidth: "100%",
        overflowX: "hidden",
      }}
    >
      <VolunteerHomeHeader
        totalNeeded={filteredOrders.length}
        title={pageCopy.title}
        isDarkMode={isDarkMode}
        onToggleTheme={onToggleTheme}
      />

      <SearchInput
        value={searchTerm}
        onSearch={handleSearch}
        placeholder={pageCopy.searchPlaceholder}
      />

      <VolunteerOrderFilters
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />

      <Grid container spacing={3}>
        <Grid xs={12} lg={8.7}>
          {isLoadingOrders ? (
            <LoadingState
              title="Carregando pedidos disponíveis"
              description="Estamos buscando pedidos próximos a você."
            />
          ) : ordersError ? (
            <ErrorState
              title="Não foi possível carregar os pedidos"
              description={ordersError}
              onRetry={handleRetryLoadOrders}
            />
          ) : visibleOrders.length > 0 ? (
            <Stack spacing={2}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "repeat(2, minmax(0, 1fr))",
                    xl: "repeat(3, minmax(0, 1fr))",
                  },
                  gap: 2,
                }}
              >
                {visibleOrders.map((order) => (
                  <AvailableOrderCard
                    key={order.id}
                    order={order}
                    isAccepted={acceptedOrderId === order.id}
                    isAccepting={acceptingOrderId === order.id}
                    isFinishing={finishingOrderId === order.id}
                    isDisabled={hasAcceptedOrder && acceptedOrderId !== order.id}
                    onViewDetails={handleViewDetails}
                    onAcceptOrder={handleAcceptOrder}
                    onFinishOrder={handleFinishOrder}
                    onUnavailableOrder={handleUnavailableOrder}
                  />
                ))}
              </Box>

              {hasMoreOrders && (
                <LoadMoreButton onClick={handleLoadMore} isLoading={isLoadingMore} />
              )}
            </Stack>
          ) : (
            <EmptyState
              title="Nenhum pedido encontrado"
              description="Tente buscar por outro título, descrição, categoria ou local."
            />
          )}
        </Grid>

        <Grid sx={{ minWidth: 0 }}>
          <Stack spacing={3} sx={{ position: { lg: "sticky" }, top: 24 }}>
            <CommunityCard
              title="Comunidade Ativa"
              subtitle={
                <>
                  <Box component="span" sx={{ color: "#88b8b5", fontWeight: 800 }}>
                    {dashboardSummary.nearbyEldersNeedingHelp} idosos
                  </Box>{" "}
                  precisam de ajuda na sua região!
                </>
              }
              buttonText="Ver Idosos Próximos"
              onButtonClick={handleViewElders}
              icon={<FavoriteBorderIcon sx={{ fontSize: 58, color: "#d99da8" }} />}
              iconBgColor="#f7e9eb"
            />
            <StatsCard
              title="Suas Estatísticas"
              stats={[
                { label: "Pessoas ajudadas", value: normalizeVolunteerStats(volunteerStats).peopleHelped, color: "#253044" },
                { label: "Pedidos concluídos", value: normalizeVolunteerStats(volunteerStats).completedOrders, color: "#96C0BE" },
                { label: "Avaliação média", value: normalizeVolunteerStats(volunteerStats).averageRating.toFixed(1), color: "#f0b4a3" },
              ]}
            />
          </Stack>
        </Grid>
      </Grid>

      <OrderDetailsModal
        open={isDetailsOpen}
        order={selectedOrder}
        isAccepted={selectedOrderIsAccepted}
        isAcceptBlocked={hasAcceptedOrder && !selectedOrderIsAccepted}
        onClose={handleCloseDetails}
        onAcceptOrder={(order) => {
          handleCloseDetails();
          handleAcceptOrder(order);
        }}
        onFinishOrder={(order) => {
          handleCloseDetails();
          handleFinishOrder(order);
        }}
      />

      <FinishHelpReportModal
        open={isFinishReportOpen}
        order={orderToFinish}
        isFinishing={Boolean(finishingOrderId)}
        onClose={handleCloseFinishReport}
        onConfirm={handleConfirmFinishOrder}
      />

      <Dialog
        open={isAcceptDialogOpen}
        onClose={handleCloseAcceptDialog}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ color: "#20283a", fontWeight: 900 }}>
          Confirmar ajuda
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: "#667085", lineHeight: 1.6 }}>
            Você quer aceitar o pedido
            {orderToAccept ? ` "${orderToAccept.title}"` : ""}?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button
            onClick={handleCloseAcceptDialog}
            disabled={Boolean(acceptingOrderId)}
            sx={{ textTransform: "none" }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirmAcceptOrder}
            disabled={Boolean(acceptingOrderId)}
            sx={{
              bgcolor: "#96C0BE",
              textTransform: "none",
              fontWeight: 800,
              boxShadow: "none",
            }}
          >
            {acceptingOrderId ? "Aceitando..." : "Confirmar ajuda"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={Boolean(feedbackMessage)}
        autoHideDuration={3000}
        onClose={() => setFeedbackMessage("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={feedbackSeverity}
          variant="filled"
          onClose={() => setFeedbackMessage("")}
        >
          {feedbackMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default VolunteerHomePage;
