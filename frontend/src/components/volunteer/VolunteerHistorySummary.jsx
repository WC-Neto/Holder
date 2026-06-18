import React from "react";
import { Box, Card, Divider, Stack, Typography } from "@mui/material";

function VolunteerHistorySummary({ total = 0, completed = 0 }) {
  const items = [
    { label: "Total de ajudas", value: total },
    { label: "Concluídas", value: completed },
  ];

  return (
    <Card
      variant="outlined"
      sx={{
        p: 2,
        bgcolor: "#fff",
        borderColor: "#eceef2",
        borderRadius: 3,
        boxShadow: "0 1px 2px rgba(37, 48, 68, 0.03)",
      }}
    >
      <Stack direction="row" sx={{ alignItems: "center" }}>
        {items.map((item, index) => (
          <React.Fragment key={item.label}>
            <Box sx={{ flex: 1, textAlign: "center" }}>
              <Typography sx={{ color: "#96C0BE", fontSize: 28, fontWeight: 900 }}>
                {item.value}
              </Typography>
              <Typography sx={{ color: "#98a1b0", fontSize: 13 }}>
                {item.label}
              </Typography>
            </Box>
            {index === 0 && <Divider flexItem orientation="vertical" />}
          </React.Fragment>
        ))}
      </Stack>
    </Card>
  );
}

export default VolunteerHistorySummary;
