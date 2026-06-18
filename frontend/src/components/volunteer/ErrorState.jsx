import React from "react";
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

function ErrorState({
  title = "Não foi possível carregar os dados",
  description = "Confira sua conexão e tente novamente.",
  retryLabel = "Tentar novamente",
  onRetry,
}) {
  return (
    <Card
      variant="outlined"
      sx={{
        p: 4,
        bgcolor: "#fff",
        borderColor: "#f5d4d8",
        borderRadius: 3,
        boxShadow: "0 1px 2px rgba(37, 48, 68, 0.03)",
      }}
    >
      <Stack spacing={1.4} sx={{ textAlign: "center", alignItems: "center" }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            bgcolor: "#fff0f2",
            color: "#d96c79",
          }}
        >
          <ErrorOutlineOutlinedIcon />
        </Box>
        <Typography sx={{ color: "#20283a", fontSize: 18, fontWeight: 900 }}>
          {title}
        </Typography>
        <Typography sx={{ color: "#98a1b0", fontSize: 14 }}>
          {description}
        </Typography>
        {onRetry && (
          <Button
            variant="contained"
            onClick={onRetry}
            sx={{
              mt: 0.5,
              bgcolor: "#96C0BE",
              borderRadius: 2,
              boxShadow: "none",
              fontWeight: 800,
              textTransform: "none",
              "&:hover": {
                bgcolor: "#87afad",
                boxShadow: "none",
              },
            }}
          >
            {retryLabel}
          </Button>
        )}
      </Stack>
    </Card>
  );
}

export default ErrorState;
