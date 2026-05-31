import React from "react";
import { Box, Card, IconButton, Stack, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

function LogoutSettingsItem({ onLogout }) {
  return (
    <Card
      variant="outlined"
      onClick={onLogout}
      sx={{
        bgcolor: "#fff",
        borderColor: "#eceef2",
        borderRadius: 3,
        boxShadow: "0 1px 2px rgba(37, 48, 68, 0.03)",
        cursor: "pointer",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ px: 2, py: 1.8 }}>
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            bgcolor: "#ffe8ea",
            color: "#ff4d4f",
          }}
        >
          <LogoutOutlinedIcon />
        </Box>

        <Typography sx={{ color: "#ff4d4f", fontSize: 15, fontWeight: 800, flex: 1 }}>
          Sair da Conta
        </Typography>

        <IconButton size="small" aria-label="Sair da Conta">
          <ChevronRightIcon sx={{ color: "#98a1b0" }} />
        </IconButton>
      </Stack>
    </Card>
  );
}

export default LogoutSettingsItem;
