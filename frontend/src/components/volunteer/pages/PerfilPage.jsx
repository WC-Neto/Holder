import React from "react";
import { Box, Typography } from "@mui/material";

function PerfilPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 2, color: "#253044" }}>
        Meu Perfil
      </Typography>
      <Typography sx={{ color: "#9ba3b3" }}>
        Edite suas informações pessoais e preferências
      </Typography>
    </Box>
  );
}

export default PerfilPage;
