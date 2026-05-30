import React from "react";
import { Box, Typography } from "@mui/material";

function InicioPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 2, color: "#253044" }}>
        Pedidos Disponíveis
      </Typography>
      <Typography sx={{ color: "#9ba3b3" }}>
        3 pessoas precisam de sua ajuda por aqui
      </Typography>
    </Box>
  );
}

export default InicioPage;
