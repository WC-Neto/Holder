import React from "react";
import { Button, Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

function LogoutButton({ onLogout }) {
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <Button
      fullWidth
      onClick={handleLogout}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        justifyContent: "flex-start",
        px: 2,
        py: 1.5,
        borderRadius: 1,
        textTransform: "none",
        fontSize: 14,
        fontWeight: 500,
        color: "#e6a0a8",
        backgroundColor: "transparent",
        border: "1px solid #e7e7ea",
        transition: "all 0.2s",
        "&:hover": {
          backgroundColor: "#ffe8ec",
          borderColor: "#e6a0a8",
        },
      }}
    >
      <LogoutIcon sx={{ fontSize: 18 }} />
      <Box component="span">Sair</Box>
    </Button>
  );
}

export default LogoutButton;
