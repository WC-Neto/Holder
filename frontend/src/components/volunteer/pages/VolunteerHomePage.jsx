import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import AvailableOrderCard from "../AvailableOrderCard";
import LoadMoreButton from "../LoadMoreButton";
import OrderMetaInfo from "../OrderMetaInfo";
import SearchInput from "../SearchInput";
import UrgencyBadge from "../UrgencyBadge";
import VolunteerCommunityCard from "../VolunteerCommunityCard";
import VolunteerHomeHeader from "../VolunteerHomeHeader";
import VolunteerOrderFilters from "../VolunteerOrderFilters";
import VolunteerStatsCard from "../VolunteerStatsCard";
import { mockOrders } from "../../../data/mockOrders";
import {
  buildAvailableOrdersSearchParams,
  searchAvailableOrders,
} from "../../../services/availableOrders";

const INITIAL_VISIBLE_ORDERS = 3;
const LOAD_MORE_STEP = 3;
const SEARCH_DEBOUNCE_MS = 300;
const MOCK_VOLUNTEER_ID = 1;

const pageCopy = {
  title: "Pedidos Disponíveis",
  searchPlaceholder: "Buscar pedidos perto de você...",
  filters: ["Filtros", "Urgentes", "Compras", "Reparos", "Companhia"],
  loadMore: "Carregar mais",
  communityTitle: "Comunidade Ativa",
  eldersButton: "Ver Idosos Próximos",
  statsTitle: "Suas Estatísticas",
};

function VolunteerHomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [displayedCount, setDisplayedCount] = useState(INITIAL_VISIBLE_ORDERS);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderToAccept, setOrderToAccept] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);
  const [acceptingOrderId, setAcceptingOrderId] = useState(null);
  const [acceptedOrderId, setAcceptedOrderId] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  useEffect(() => {
    const debounceId = window.setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(debounceId);
  }, [searchTerm]);

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
    () => searchAvailableOrders(mockOrders, availableOrderSearchParams),
    [availableOrderSearchParams],
  );

  useEffect(() => {
    setDisplayedCount(INITIAL_VISIBLE_ORDERS);
  }, [activeFilter, debouncedSearchTerm]);

  const visibleOrders = filteredOrders.slice(0, displayedCount);
  const hasMoreOrders = filteredOrders.length > displayedCount;
  const hasAcceptedOrder = Boolean(acceptedOrderId);
  const selectedOrderIsAccepted =
    Boolean(selectedOrder) && selectedOrder.id === acceptedOrderId;

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

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
  };

  const handleAcceptOrder = (order) => {
    if (hasAcceptedOrder && order.id !== acceptedOrderId) {
      setFeedbackMessage("Você já aceitou um pedido. Finalize-o antes de aceitar outro.");
      return;
    }

    if (order.id === acceptedOrderId) {
      setFeedbackMessage("Este pedido já está aceito por você.");
      return;
    }

    setOrderToAccept(order);
    setIsAcceptDialogOpen(true);
  };

  const handleUnavailableOrder = () => {
    setFeedbackMessage("Existe uma atividade em andamento. Finalize-a antes de aceitar outro pedido.");
  };

  const handleCloseAcceptDialog = () => {
    if (!acceptingOrderId) {
      setIsAcceptDialogOpen(false);
    }
  };

  const handleConfirmAcceptOrder = () => {
    if (!orderToAccept) {
      return;
    }

    const orderId = orderToAccept.id;
    setAcceptingOrderId(orderId);
    setIsAcceptDialogOpen(false);

    // Preparado para trocar por PATCH /pedidos/{pedido_id}/aceitar.
    window.setTimeout(() => {
      setAcceptedOrderId(orderId);
      setAcceptingOrderId(null);
      setFeedbackMessage(`Pedido aceito: ${orderToAccept.title}`);
      setOrderToAccept(null);
    }, 350);
  };

  const handleViewElders = () => {
    console.log("Abrir tela de idosos próximos");
  };

  return (
    <Box
      sx={{
        px: { xs: 2, md: 4 },
        py: { xs: 3, md: 3.5 },
        minHeight: "100vh",
        bgcolor: "#fbfbfc",
      }}
    >
      <VolunteerHomeHeader totalNeeded={filteredOrders.length} title={pageCopy.title} />

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
        <Grid item xs={12} lg={8.7}>
          {visibleOrders.length > 0 ? (
            <Stack spacing={2}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "repeat(2, minmax(0, 1fr))",
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
                    isDisabled={
                      hasAcceptedOrder && acceptedOrderId !== order.id
                    }
                    onViewDetails={handleViewDetails}
                    onAcceptOrder={handleAcceptOrder}
                    onUnavailableOrder={handleUnavailableOrder}
                  />
                ))}
              </Box>

              {hasMoreOrders && (
                <LoadMoreButton onClick={handleLoadMore} isLoading={isLoadingMore} />
              )}
            </Stack>
          ) : (
            <Box
              sx={{
                p: 4,
                bgcolor: "#fff",
                border: "1px solid #eceef2",
                borderRadius: 3,
                textAlign: "center",
              }}
            >
              <Typography
                component="h2"
                sx={{ color: "#20283a", fontSize: 18, fontWeight: 800, mb: 0.75 }}
              >
                Nenhum pedido encontrado
              </Typography>
              <Typography sx={{ color: "#667085", fontSize: 14 }}>
                Tente buscar por outro título, descrição, categoria ou local.
              </Typography>
            </Box>
          )}
        </Grid>

        <Grid item xs={12} lg={3.3}>
          <Stack spacing={3} sx={{ position: { lg: "sticky" }, top: 24 }}>
            <VolunteerCommunityCard activeElders={3} onViewElders={handleViewElders} />
            <VolunteerStatsCard peopleHelped={24} tasksCompleted={38} avgRating={4.9} />
          </Stack>
        </Grid>
      </Grid>

      <Dialog
        open={isDetailsOpen}
        onClose={handleCloseDetails}
        fullWidth
        maxWidth="sm"
      >
        {selectedOrder && (
          <>
            <DialogTitle sx={{ color: "#20283a", fontWeight: 900 }}>
              {selectedOrder.title}
            </DialogTitle>
            <DialogContent>
              <Stack spacing={2}>
                <UrgencyBadge
                  urgencyTone={selectedOrder.urgencyTone}
                  label={selectedOrder.urgencyLevel}
                />
                <Typography sx={{ color: "#667085", lineHeight: 1.6 }}>
                  {selectedOrder.description}
                </Typography>
                <Divider />
                <OrderMetaInfo
                  distance={selectedOrder.distance}
                  neighborhood={selectedOrder.neighborhood}
                  timeAgo={selectedOrder.timeAgo}
                />
              </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2.5 }}>
              <Button onClick={handleCloseDetails} sx={{ textTransform: "none" }}>
                Fechar
              </Button>
              {selectedOrderIsAccepted ? (
                <Button variant="contained" disabled sx={{ textTransform: "none" }}>
                  Pedido aceito
                </Button>
              ) : (
                <Button
                  variant="contained"
                  disabled={hasAcceptedOrder}
                  onClick={() => {
                    handleCloseDetails();
                    handleAcceptOrder(selectedOrder);
                  }}
                  sx={{
                    bgcolor: "#e4a0aa",
                    textTransform: "none",
                    fontWeight: 800,
                    boxShadow: "none",
                  }}
                >
                  {hasAcceptedOrder ? "Já existe pedido aceito" : "Ajudar agora"}
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>

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
            Confirmar ajuda
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
          severity="success"
          variant="filled"
          onClose={() => setFeedbackMessage("")}
        >
          {feedbackMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default VolunteerHomePage;
