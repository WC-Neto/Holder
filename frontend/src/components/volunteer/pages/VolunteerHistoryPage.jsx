import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import VolunteerHistoryCard from "../VolunteerHistoryCard";
import VolunteerHistoryStatusTabs from "../VolunteerHistoryStatusTabs";
import VolunteerHistorySummary from "../VolunteerHistorySummary";
import {
  buildVolunteerHistoryQueryParams,
  filterVolunteerHistory,
  getVolunteerHistory,
  getVolunteerHistorySummary,
} from "../../../services/volunteerHistory";

const MOCK_VOLUNTEER_ID = 1;

function VolunteerHistoryPage() {
  const [historyItems, setHistoryItems] = useState([]);
  const [activeHistoryFilter, setActiveHistoryFilter] = useState("all");
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  useEffect(() => {
    const historyQueryParams = buildVolunteerHistoryQueryParams({
      volunteerId: MOCK_VOLUNTEER_ID,
      activeHistoryFilter,
    });

    getVolunteerHistory(historyQueryParams).then(setHistoryItems);
  }, []);

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
        bgcolor: "#fbfbfc",
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography
          component="h1"
          sx={{ color: "#20283a", fontSize: 26, fontWeight: 900 }}
        >
          Meu Histórico
        </Typography>
        <Typography sx={{ color: "#98a1b0", fontSize: 16, mt: 0.4 }}>
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

        {filteredHistory.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
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
          <Box
            sx={{
              p: 4,
              bgcolor: "#fff",
              border: "1px solid #eceef2",
              borderRadius: 3,
              textAlign: "center",
            }}
          >
            <Typography sx={{ color: "#20283a", fontSize: 18, fontWeight: 900 }}>
              Nenhuma ajuda encontrada
            </Typography>
            <Typography sx={{ color: "#98a1b0", fontSize: 14, mt: 0.75 }}>
              Quando você aceitar ou concluir pedidos, eles aparecerão aqui.
            </Typography>
          </Box>
        )}
      </Stack>

      <Dialog
        open={Boolean(selectedHistoryItem)}
        onClose={() => setSelectedHistoryItem(null)}
        fullWidth
        maxWidth="xs"
      >
        {selectedHistoryItem && (
          <>
            <DialogTitle sx={{ color: "#20283a", fontWeight: 900 }}>
              Detalhes da ajuda
            </DialogTitle>
            <DialogContent>
              <Stack spacing={1.2}>
                <Typography sx={{ color: "#20283a", fontWeight: 900 }}>
                  {selectedHistoryItem.title}
                </Typography>
                <Typography sx={{ color: "#667085", fontSize: 14 }}>
                  {selectedHistoryItem.elderName} • {selectedHistoryItem.neighborhood}
                </Typography>
                <Typography sx={{ color: "#667085", fontSize: 14 }}>
                  {selectedHistoryItem.details}
                </Typography>
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

export default VolunteerHistoryPage;
