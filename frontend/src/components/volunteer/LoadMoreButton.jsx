import React from "react";
import { Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function LoadMoreButton({ onClick, isLoading = false }) {
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
        bgcolor: "#fff",
        border: "1px solid #eceef2",
        color: "#3e4654",
        fontSize: 14,
        fontWeight: 700,
        textTransform: "none",
        boxShadow: "none",
        "&:hover": {
          bgcolor: "#f8f9fb",
          boxShadow: "none",
        },
      }}
    >
      {isLoading ? "Carregando..." : "Carregar mais"}
    </Button>
  );
}

export default LoadMoreButton;
