import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

function VolunteerHomeHeader({
  totalNeeded = 3,
  isDarkMode = false,
  onToggleTheme,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 2,
        mb: 4,
        pb: 3,
        borderBottom: `1px solid ${isDarkMode ? "#253044" : "#eef0f4"}`,
      }}
    >
      <Box>
        <Typography
          component="h1"
          sx={{
            color: isDarkMode ? "#f8fafc" : "#20283a",
            fontSize: { xs: 24, md: 28 },
            fontWeight: 800,
            lineHeight: 1.15,
            mb: 0.8,
          }}
        >
          Pedidos Disponíveis
        </Typography>
        <Typography sx={{ color: isDarkMode ? "#a8b3c7" : "#99a2b2", fontSize: 15 }}>
          {totalNeeded} pessoa{totalNeeded !== 1 ? "s" : ""} precisam de ajuda por
          aqui
        </Typography>
      </Box>

      <IconButton
        aria-label="Alternar tema"
        aria-pressed={isDarkMode}
        onClick={onToggleTheme}
        sx={{
          width: 44,
          height: 44,
          bgcolor: isDarkMode ? "#253044" : "#f5f6f8",
          color: isDarkMode ? "#f8fafc" : "#253044",
          "&:hover": { bgcolor: isDarkMode ? "#334155" : "#eef0f4" },
        }}
      >
        {isDarkMode ? (
          <LightModeOutlinedIcon fontSize="small" />
        ) : (
          <DarkModeOutlinedIcon fontSize="small" />
        )}
      </IconButton>
    </Box>
  );
}

export default VolunteerHomeHeader;
