import React from "react";
import { Box, Typography } from "@mui/material";

function HistoricoPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 2, color: "#253044" }}>
        Meu Histórico
      </Typography>
      <Typography sx={{ color: "#9ba3b3" }}>
        Veja todas as pessoas que você ajudou
      </Typography>
    </Box>
  );
}

export default HistoricoPage;
