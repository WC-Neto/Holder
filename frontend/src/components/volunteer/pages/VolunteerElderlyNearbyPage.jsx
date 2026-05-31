import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import EmptyState from "../EmptyState";
import ErrorState from "../ErrorState";
import LoadingState from "../LoadingState";
import NearbyElderlyBanner from "../NearbyElderlyBanner";
import NearbyElderlyCard from "../NearbyElderlyCard";
import NearbyElderlyDetailsModal from "../NearbyElderlyDetailsModal";
import { getNearbyElderly } from "../../../services/nearbyElderly";

const MOCK_VOLUNTEER_ID = 1;

function VolunteerElderlyNearbyPage({ isDarkMode = false }) {
  const [nearbyElderly, setNearbyElderly] = useState([]);
  const [favoriteElderlyIds, setFavoriteElderlyIds] = useState([]);
  const [selectedElderlyId, setSelectedElderlyId] = useState(null);
  const [selectedElderly, setSelectedElderly] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isLoadingNearbyElderly, setIsLoadingNearbyElderly] = useState(true);
  const [nearbyElderlyError, setNearbyElderlyError] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const loadNearbyElderly = async () => {
    setIsLoadingNearbyElderly(true);
    setNearbyElderlyError("");

    try {
      const elderlyList = await getNearbyElderly({ volunteerId: MOCK_VOLUNTEER_ID });
      setNearbyElderly(elderlyList);
    } catch (error) {
      setNearbyElderly([]);
      setNearbyElderlyError(
        error?.message ?? "Não foi possível carregar os idosos próximos.",
      );
    } finally {
      setIsLoadingNearbyElderly(false);
    }
  };

  const handleRetryLoadNearbyElderly = () => {
    loadNearbyElderly();
  };

  useEffect(() => {
    let isMounted = true;

    setIsLoadingNearbyElderly(true);
    setNearbyElderlyError("");

    getNearbyElderly({ volunteerId: MOCK_VOLUNTEER_ID })
      .then((elderlyList) => {
        if (isMounted) {
          setNearbyElderly(elderlyList);
        }
      })
      .catch((error) => {
        if (isMounted) {
          setNearbyElderly([]);
          setNearbyElderlyError(
            error?.message ?? "Não foi possível carregar os idosos próximos.",
          );
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoadingNearbyElderly(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleContactElderly = (elderly) => {
    setFeedbackMessage(`Contato iniciado com ${elderly.name}.`);
  };

  const handleSelectElderly = (elderly) => {
    setSelectedElderlyId(elderly.id);
    setSelectedElderly(elderly);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedElderlyId(null);
    setSelectedElderly(null);
  };

  const handleToggleInterest = (elderly) => {
    setFavoriteElderlyIds((currentIds) => {
      if (currentIds.includes(elderly.id)) {
        setFeedbackMessage(`Interesse removido em ${elderly.name}.`);
        return currentIds.filter((id) => id !== elderly.id);
      }

      setFeedbackMessage(`Interesse demonstrado em ${elderly.name}.`);
      return [...currentIds, elderly.id];
    });
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: isDarkMode ? "#0f172a" : "#fbfbfc" }}>
      <Box sx={{ px: { xs: 2, md: 4 }, pt: { xs: 3, md: 3.5 }, pb: 2.5 }}>
        <Typography
          component="h1"
          sx={{ color: "#20283a", fontSize: 26, fontWeight: 900 }}
        >
          Idosos Próximos
        </Typography>
        <Typography sx={{ color: "#98a1b0", fontSize: 16, mt: 0.4 }}>
          Encontre idosos que precisam de ajuda
        </Typography>
      </Box>

      <NearbyElderlyBanner nearbyCount={nearbyElderly.length} />

      <Box sx={{ px: { xs: 2, md: 4 }, py: 3.5 }}>
        {isLoadingNearbyElderly ? (
          <LoadingState
            title="Carregando idosos próximos"
            description="Estamos buscando pessoas que precisam de ajuda na sua região."
          />
        ) : nearbyElderlyError ? (
          <ErrorState
            title="Não foi possível carregar os idosos próximos"
            description={nearbyElderlyError}
            onRetry={handleRetryLoadNearbyElderly}
          />
        ) : nearbyElderly.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                lg: "repeat(3, minmax(0, 1fr))",
              },
              gap: 2,
            }}
          >
            {nearbyElderly.map((elderly) => (
              <NearbyElderlyCard
                key={elderly.id}
                elderly={elderly}
                isSelected={selectedElderlyId === elderly.id}
                isInterested={favoriteElderlyIds.includes(elderly.id)}
                onClick={handleSelectElderly}
                onContact={handleContactElderly}
                onToggleInterest={handleToggleInterest}
              />
            ))}
          </Box>
        ) : (
          <EmptyState
            title="Nenhum idoso próximo encontrado"
            description="Quando houver idosos precisando de ajuda na região, eles aparecerão aqui."
          />
        )}
      </Box>

      <NearbyElderlyDetailsModal
        open={isDetailsOpen}
        elderly={selectedElderly}
        onClose={handleCloseDetails}
        onContact={handleContactElderly}
      />

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

export default VolunteerElderlyNearbyPage;
