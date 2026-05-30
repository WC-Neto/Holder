import React from "react";
import { Box, Typography } from "@mui/material";

function IdososPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 2, color: "#253044" }}>
        Idosos Próximos
      </Typography>
      <Typography sx={{ color: "#9ba3b3" }}>
        Encontre idosos que precisam de ajuda perto de você
      </Typography>
    </Box>
  );
}

export default IdososPage;
