import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

function VolunteerHomeHeader({ totalNeeded = 3 }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 2,
        mb: 4,
        pb: 3,
        borderBottom: "1px solid #eef0f4",
      }}
    >
      <Box>
        <Typography
          component="h1"
          sx={{
            color: "#20283a",
            fontSize: { xs: 24, md: 28 },
            fontWeight: 800,
            lineHeight: 1.15,
            mb: 0.8,
          }}
        >
          Pedidos Disponíveis
        </Typography>
        <Typography sx={{ color: "#99a2b2", fontSize: 15 }}>
          {totalNeeded} pessoa{totalNeeded !== 1 ? "s" : ""} precisam de ajuda por
          aqui
        </Typography>
      </Box>

      <IconButton
        aria-label="Alternar tema"
        sx={{
          width: 44,
          height: 44,
          bgcolor: "#f5f6f8",
          color: "#253044",
          "&:hover": { bgcolor: "#eef0f4" },
        }}
      >
        <DarkModeOutlinedIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

export default VolunteerHomeHeader;
