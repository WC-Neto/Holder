import React from "react";
import { Box, Card, Stack, Typography } from "@mui/material";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";

function EmptyState({
  title = "Nenhum resultado encontrado",
  description = "Tente novamente mais tarde.",
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
      <Stack alignItems="center" spacing={1.3} sx={{ textAlign: "center" }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            bgcolor: "#eef8f7",
            color: "#96C0BE",
          }}
        >
          <InboxOutlinedIcon />
        </Box>
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

export default EmptyState;
