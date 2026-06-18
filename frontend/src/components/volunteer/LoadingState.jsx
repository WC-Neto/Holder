import React from "react";
import { Card, CircularProgress, Stack, Typography } from "@mui/material";

function LoadingState({
  title = "Carregando dados",
  description = "Aguarde um instante.",
}) {
  return (
    <Card
      variant="outlined"
      sx={{
        p: 4,
        bgcolor: "#fff",
        borderColor: "#eceef2",
        borderRadius: 3,
        boxShadow: "0 1px 2px rgba(37, 48, 68, 0.03)",
      }}
    >
      <Stack spacing={1.5} sx={{ textAlign: "center", alignItems: "center" }}>
        <CircularProgress size={30} sx={{ color: "#96C0BE" }} />
        <Typography sx={{ color: "#20283a", fontSize: 18, fontWeight: 900 }}>
          {title}
        </Typography>
        <Typography sx={{ color: "#98a1b0", fontSize: 14 }}>
          {description}
        </Typography>
      </Stack>
    </Card>
  );
}

export default LoadingState;
