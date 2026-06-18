import React from "react";
import { Box, Card, Stack, Typography } from "@mui/material";

function StatsCard({ title, stats }) {
  return (
    <Card
      variant="outlined"
      sx={{
        p: 2.6,
        bgcolor: "#fff",
        borderColor: "#eceef2",
        borderRadius: 3,
        boxShadow: "0 1px 2px #eceef2",
      }}
    >
      <Typography sx={{ color: "#20283a", fontSize: 18, fontWeight: 800, mb: 2.4 }}>
        {title}
      </Typography>

      <Stack spacing={2.2}>
        {stats.map((stat, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Typography sx={{ color: "#98a1b0", fontSize: 14 }}>
              {stat.label}
            </Typography>
            <Typography sx={{ color: stat.color || "#253044", fontSize: 18, fontWeight: 900 }}>
              {stat.value}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Card>
  );
}

export default StatsCard;
