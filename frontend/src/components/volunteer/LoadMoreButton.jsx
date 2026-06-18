import React from "react";
import { Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useThemeMode } from "../../contexts/ThemeContext";

function LoadMoreButton({ onClick, isLoading = false }) {
  const { isDarkMode } = useThemeMode();

  return (
    <Button
      fullWidth
      type="button"
      onClick={onClick}
      disabled={isLoading}
      endIcon={<ExpandMoreIcon />}
      sx={{
        minHeight: 50,
        mt: 2,
        borderRadius: 3,
        bgcolor: isDarkMode ? "#1e293b" : "#fff",
        border: `1px solid ${isDarkMode ? "#253044" : "#eceef2"}`,
        color: isDarkMode ? "#a8b3c7" : "#3e4654",
        fontSize: 14,
        fontWeight: 700,
        textTransform: "none",
        boxShadow: "none",
        "&:hover": {
          bgcolor: isDarkMode ? "#253044" : "#f8f9fb",
          boxShadow: "none",
        },
      }}
    >
      {isLoading ? "Carregando..." : "Carregar mais"}
    </Button>
  );
}

export default LoadMoreButton;
