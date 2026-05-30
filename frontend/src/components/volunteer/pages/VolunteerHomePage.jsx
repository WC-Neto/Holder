import React, { useEffect, useMemo, useState } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import AvailableOrderCard from "../AvailableOrderCard";
import LoadMoreButton from "../LoadMoreButton";
import SearchInput from "../SearchInput";
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

  const handleViewMore = (orderId) => {
    console.log("Ver mais detalhes do pedido:", orderId);
  };

  const handleHelpNow = (orderId) => {
    console.log("Preparar aceite futuro via PATCH /pedidos/{pedido_id}/aceitar:", orderId);
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
                    onViewMore={handleViewMore}
                    onHelpNow={handleHelpNow}
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
    </Box>
  );
}

export default VolunteerHomePage;
