import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import EmptyState from "../EmptyState";
import ErrorState from "../ErrorState";
import LoadingState from "../LoadingState";
import VolunteerHistoryCard from "../VolunteerHistoryCard";
import VolunteerHistoryStatusTabs from "../VolunteerHistoryStatusTabs";
import VolunteerHistorySummary from "../VolunteerHistorySummary";
import {
  buildVolunteerHistoryQueryParams,
  filterVolunteerHistory,
  getVolunteerHistory,
  getVolunteerHistorySummary,
} from "../../../services/volunteerHistory";
import { useThemeMode } from "../../../contexts/ThemeContext";

const MOCK_VOLUNTEER_ID = 1;

function VolunteerHistoryPage() {
  const { isDarkMode } = useThemeMode();
  const [historyItems, setHistoryItems] = useState([]);
  const [activeHistoryFilter, setActiveHistoryFilter] = useState("all");
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [historyError, setHistoryError] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const historyQueryParams = useMemo(
    () =>
      buildVolunteerHistoryQueryParams({
        volunteerId: MOCK_VOLUNTEER_ID,
        activeHistoryFilter,
      }),
    [activeHistoryFilter],
  );

  const loadVolunteerHistory = async () => {
    setIsLoadingHistory(true);
    setHistoryError("");
    try {
      const nextHistoryItems = await getVolunteerHistory(historyQueryParams);
      setHistoryItems(nextHistoryItems);
    } catch (error) {
      setHistoryItems([]);
      setHistoryError(error?.message ?? "Não foi possível carregar o histórico.");
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const handleRetryLoadHistory = () => {
    loadVolunteerHistory();
  };

  useEffect(() => {
    let isMounted = true;
    setIsLoadingHistory(true);
    setHistoryError("");

    getVolunteerHistory(historyQueryParams)
      .then((nextHistoryItems) => {
        if (isMounted) setHistoryItems(nextHistoryItems);
      })
      .catch((error) => {
        if (isMounted) {
          setHistoryItems([]);
          setHistoryError(error?.message ?? "Não foi possível carregar o histórico.");
        }
      })
      .finally(() => {
        if (isMounted) setIsLoadingHistory(false);
      });

    return () => { isMounted = false; };
  }, [historyQueryParams]);

  const filteredHistory = useMemo(
    () => filterVolunteerHistory(historyItems, activeHistoryFilter),
    [activeHistoryFilter, historyItems],
  );

  const historySummary = useMemo(
    () => getVolunteerHistorySummary(historyItems),
    [historyItems],
  );

  const handleViewHistoryDetails = (historyItem) => {
    setSelectedHistoryItem(historyItem);
  };

  const handleContactElderly = (historyItem) => {
    setFeedbackMessage(`Contato iniciado com ${historyItem.elderName}.`);
  };

  return (
    <Box
      sx={{
        px: { xs: 2, md: 4 },
        py: { xs: 3, md: 3.5 },
        minHeight: "100vh",
        bgcolor: isDarkMode ? "#0f172a" : "#fbfbfc",
        maxWidth: "100%",
        overflowX: "hidden",
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography
          component="h1"
          sx={{ color: isDarkMode ? "#f8fafc" : "#20283a", fontSize: 26, fontWeight: 900 }}
        >
          Meu Histórico
        </Typography>
        <Typography sx={{ color: isDarkMode ? "#a8b3c7" : "#98a1b0", fontSize: 16, mt: 0.4 }}>
          Veja todas as pessoas que você ajudou
        </Typography>
      </Box>

      <Stack spacing={2.5}>
        <VolunteerHistorySummary
          total={historySummary.total}
          completed={historySummary.completed}
        />

        <VolunteerHistoryStatusTabs
          activeStatus={activeHistoryFilter}
          onStatusChange={setActiveHistoryFilter}
        />

        {isLoadingHistory ? (
          <LoadingState
            title="Carregando histórico"
            description="Estamos buscando suas ajudas recentes."
          />
        ) : historyError ? (
          <ErrorState
            title="Não foi possível carregar o histórico"
            description={historyError}
            onRetry={handleRetryLoadHistory}
          />
        ) : filteredHistory.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(2, minmax(0, 1fr))",
                lg: "repeat(2, minmax(0, 1fr))",
              },
              gap: 2,
            }}
          >
            {filteredHistory.map((historyItem) => (
              <VolunteerHistoryCard
                key={historyItem.id}
                historyItem={historyItem}
                onContact={handleContactElderly}
                onViewDetails={handleViewHistoryDetails}
              />
            ))}
          </Box>
        ) : (
          <EmptyState
            title="Nenhuma ajuda encontrada"
            description="Quando você aceitar ou concluir pedidos, eles aparecerão aqui."
          />
        )}
      </Stack>

      <Dialog
        open={Boolean(selectedHistoryItem)}
        onClose={() => setSelectedHistoryItem(null)}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: { bgcolor: isDarkMode ? "#1e293b" : "#fff" },
        }}
      >
        {selectedHistoryItem && (
          <>
            <DialogTitle sx={{ color: isDarkMode ? "#f8fafc" : "#20283a", fontWeight: 900 }}>
              Detalhes da ajuda
            </DialogTitle>
            <DialogContent>
              <Stack spacing={1.2}>
                <Typography sx={{ color: isDarkMode ? "#f8fafc" : "#20283a", fontWeight: 900 }}>
                  {selectedHistoryItem.title}
                </Typography>
                <Typography sx={{ color: isDarkMode ? "#a8b3c7" : "#667085", fontSize: 14 }}>
                  {selectedHistoryItem.elderName} • {selectedHistoryItem.neighborhood}
                </Typography>
                <Typography sx={{ color: isDarkMode ? "#a8b3c7" : "#667085", fontSize: 14 }}>
                  {selectedHistoryItem.details}
                </Typography>
                <Divider sx={{ borderColor: isDarkMode ? "#253044" : undefined }} />
                <Box>
                  <Typography
                    sx={{ color: isDarkMode ? "#64748b" : "#98a1b0", fontSize: 12, fontWeight: 900, mb: 0.6 }}
                  >
                    Relatório da finalização
                  </Typography>
                  <Typography sx={{ color: isDarkMode ? "#a8b3c7" : "#667085", fontSize: 14, lineHeight: 1.55 }}>
                    {selectedHistoryItem.completionReport ||
                      "Relatório disponível quando a ajuda for finalizada."}
                  </Typography>
                </Box>
              </Stack>
            </DialogContent>
          </>
        )}
      </Dialog>

      <Snackbar
        open={Boolean(feedbackMessage)}
        autoHideDuration={2600}
        onClose={() => setFeedbackMessage("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" onClose={() => setFeedbackMessage("")}>
          {feedbackMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default VolunteerHistoryPage;
