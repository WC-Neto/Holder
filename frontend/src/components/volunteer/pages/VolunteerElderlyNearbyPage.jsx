import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import ElderlyCard from "../ElderlyCard";
import NearbyElderlyBanner from "../NearbyElderlyBanner";
import { getNearbyElderly } from "../../../services/nearbyElderly";

const MOCK_VOLUNTEER_ID = 1;

function VolunteerElderlyNearbyPage() {
  const [nearbyElderly, setNearbyElderly] = useState([]);
  const [favoriteElderlyIds, setFavoriteElderlyIds] = useState([]);
  const [isLoadingNearbyElderly, setIsLoadingNearbyElderly] = useState(true);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    setIsLoadingNearbyElderly(true);

    getNearbyElderly({ volunteerId: MOCK_VOLUNTEER_ID }).then((elderlyList) => {
      if (isMounted) {
        setNearbyElderly(elderlyList);
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
    <Box sx={{ minHeight: "100vh", bgcolor: "#fbfbfc" }}>
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
          <Box sx={{ display: "grid", placeItems: "center", py: 8 }}>
            <CircularProgress size={28} sx={{ color: "#96C0BE" }} />
          </Box>
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
              <ElderlyCard
                key={elderly.id}
                elderly={elderly}
                isInterested={favoriteElderlyIds.includes(elderly.id)}
                onContact={handleContactElderly}
                onToggleInterest={handleToggleInterest}
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
              Nenhum idoso próximo encontrado
            </Typography>
            <Typography sx={{ color: "#98a1b0", fontSize: 14, mt: 0.75 }}>
              Quando houver idosos precisando de ajuda na região, eles aparecerão aqui.
            </Typography>
          </Box>
        )}
      </Box>

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
