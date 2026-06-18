import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import VolunteerCard from "../VolunteerCard";

// Mock de voluntários próximos
const mockNearbyVolunteers = [
  {
    id: 1,
    photoUrl: "https://i.pravatar.cc/150?u=vol1",
    name: "Ana Clara",
    distance: "300m",
    rating: 4.9,
  },
  {
    id: 2,
    photoUrl: "https://i.pravatar.cc/150?u=vol2",
    name: "Carlos Santos",
    distance: "800m",
    rating: 5.0,
  },
  {
    id: 3,
    photoUrl: "https://i.pravatar.cc/150?u=vol3",
    name: "Mariana Silva",
    distance: "1.2km",
    rating: 4.7,
  },
];

function ElderlyVolunteersPage({ isDarkMode = false }) {
  const [nearbyVolunteers, setNearbyVolunteers] = useState([]);
  const [selectedVolunteerId, setSelectedVolunteerId] = useState(null);
  const [favoriteVolunteerIds, setFavoriteVolunteerIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Simulação de carregamento (setTimeout)
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const timer = setTimeout(() => {
      if (isMounted) {
        setNearbyVolunteers(mockNearbyVolunteers);
        setIsLoading(false);
      }
    }, 1500);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  const handleToggleInterest = (volunteer) => {
    setFavoriteVolunteerIds((currentIds) => {
      if (currentIds.includes(volunteer.id)) {
        setFeedbackMessage(`Interesse removido em ${volunteer.name}.`);
        return currentIds.filter((id) => id !== volunteer.id);
      }

      setFeedbackMessage(`Interesse demonstrado em ${volunteer.name}.`);
      return [...currentIds, volunteer.id];
    });
  };

  const handleSelectVolunteer = (volunteer) => {
    setSelectedVolunteerId(volunteer.id);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: isDarkMode ? "#0f172a" : "#fbfbfc" }}>
      <Box sx={{ px: { xs: 2, md: 4 }, pt: { xs: 3, md: 3.5 }, pb: 2.5 }}>
        <Typography
          component="h1"
          sx={{ color: "#20283a", fontSize: 26, fontWeight: 900 }}
        >
          Voluntários Próximos
        </Typography>
        <Typography sx={{ color: "#98a1b0", fontSize: 16, mt: 0.4 }}>
          Encontre voluntários perto de você
        </Typography>
      </Box>

      <Box sx={{ width: '100%', bgcolor: '#eef7f8', py: 1.5, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
        <VolunteerActivismOutlinedIcon sx={{ color: '#8ab9b6', fontSize: 20 }} />
        <Typography sx={{ color: '#8ab9b6', fontSize: 14, fontWeight: 700 }}>
          {nearbyVolunteers.length} voluntários ativos perto de você
        </Typography>
      </Box>

      <Box sx={{ px: { xs: 2, md: 4 }, py: 3.5 }}>
        {isLoading ? (
          <Box
            sx={{
              p: 4,
              bgcolor: "#fff",
              borderColor: "#eceef2",
              borderWidth: 1,
              borderStyle: "solid",
              borderRadius: 3,
              boxShadow: "0 1px 2px rgba(37, 48, 68, 0.03)",
              textAlign: "center",
            }}
          >
            <Stack spacing={1.5} sx={{ alignItems: "center" }}>
              <CircularProgress size={30} sx={{ color: "#96C0BE" }} />
              <Typography sx={{ color: "#20283a", fontSize: 18, fontWeight: 900 }}>
                Carregando dados
              </Typography>
              <Typography sx={{ color: "#98a1b0", fontSize: 14 }}>
                Buscando voluntários na sua região...
              </Typography>
            </Stack>
          </Box>
        ) : nearbyVolunteers.length > 0 ? (
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
            {nearbyVolunteers.map((volunteer) => (
              <VolunteerCard
                key={volunteer.id}
                volunteer={volunteer}
                isSelected={selectedVolunteerId === volunteer.id}
                isInterested={favoriteVolunteerIds.includes(volunteer.id)}
                onClick={handleSelectVolunteer}
                onToggleInterest={handleToggleInterest}
              />
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              p: 4,
              bgcolor: "#fff",
              borderColor: "#eceef2",
              borderWidth: 1,
              borderStyle: "solid",
              borderRadius: 3,
              boxShadow: "0 1px 2px rgba(37, 48, 68, 0.03)",
              textAlign: "center",
            }}
          >
            <Stack spacing={1.3} sx={{ alignItems: "center" }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  bgcolor: "#eef8f7",
                  color: "#96C0BE",
                }}
              >
                <InboxOutlinedIcon />
              </Box>
              <Typography sx={{ color: "#20283a", fontSize: 18, fontWeight: 900 }}>
                Nenhum voluntário encontrado
              </Typography>
              <Typography sx={{ color: "#98a1b0", fontSize: 14 }}>
                No momento, não há voluntários disponíveis na sua região.
              </Typography>
            </Stack>
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
          sx={{ bgcolor: "#96C0BE", color: "#fff" }}
        >
          {feedbackMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ElderlyVolunteersPage;
