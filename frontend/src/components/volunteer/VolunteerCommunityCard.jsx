import React from "react";
import { Box, Button, Card, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";

function VolunteerCommunityCard({
  activeElders,
  nearbyEldersCount = activeElders ?? 0,
  onViewElders,
}) {
  return (
    <Card
      variant="outlined"
      sx={{
        p: 2.6,
        bgcolor: "#fff",
        borderColor: "#eceef2",
        borderRadius: 3,
        boxShadow: "0 1px 2px rgba(37, 48, 68, 0.03)",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          minHeight: 128,
          borderRadius: 2,
          bgcolor: "#f7e9eb",
          color: "#d99da8",
          display: "grid",
          placeItems: "center",
          mb: 2,
        }}
      >
        <FavoriteBorderIcon sx={{ fontSize: 58 }} />
      </Box>

      <Typography sx={{ color: "#20283a", fontSize: 20, fontWeight: 800, mb: 1 }}>
        Comunidade Ativa
      </Typography>

      <Typography sx={{ color: "#98a1b0", fontSize: 14, mb: 2.4 }}>
        <Box component="span" sx={{ color: "#88b8b5", fontWeight: 800 }}>
          {nearbyEldersCount} idosos
        </Box>{" "}
        precisam de ajuda na sua região!
      </Typography>

      <Button
        variant="contained"
        fullWidth
        startIcon={<PeopleAltOutlinedIcon />}
        onClick={onViewElders}
        sx={{
          minHeight: 48,
          borderRadius: 2,
          bgcolor: "#96C0BE",
          background: "linear-gradient(90deg, #a8c5ad 0%, #96C0BE 100%)",
          color: "#fff",
          fontWeight: 800,
          textTransform: "none",
          boxShadow: "none",
          "&:hover": {
            bgcolor: "#87afad",
            boxShadow: "none",
          },
        }}
      >
        Ver Idosos Próximos
      </Button>
    </Card>
  );
}

export default VolunteerCommunityCard;
