import React from "react";
import { Box, Card, Stack, Typography } from "@mui/material";
import { useThemeMode } from "../../contexts/ThemeContext";

function StatsCard({ title, stats }) {
  const { isDarkMode } = useThemeMode();

  return (
    <Card
      variant="outlined"
      sx={{
        p: 2.6,
        bgcolor: isDarkMode ? "#1e293b" : "#fff",
        borderColor: isDarkMode ? "#253044" : "#eceef2",
        borderRadius: 3,
        boxShadow: "0 1px 2px rgba(37, 48, 68, 0.03)",
      }}
    >
      <Typography sx={{ color: isDarkMode ? "#f8fafc" : "#20283a", fontSize: 18, fontWeight: 800, mb: 2.4 }}>
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
            <Typography sx={{ color: isDarkMode ? "#a8b3c7" : "#98a1b0", fontSize: 14 }}>
              {stat.label}
            </Typography>
            <Typography sx={{ color: stat.color || "#ffffff", fontSize: 18, fontWeight: 900 }}>
              {stat.value}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Card>
  );
}

export default StatsCard;
