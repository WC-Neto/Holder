import React from "react";
import { Box, Card, Stack, Typography } from "@mui/material";
import { normalizeVolunteerStats } from "../../services/volunteerStats";

/**
 * @typedef {import("../../services/volunteerStats").VolunteerStats} VolunteerStats
 */

function VolunteerStatsCard({ stats }) {
  const volunteerStats = normalizeVolunteerStats(stats);
  const statsRows = [
    {
      label: "Pessoas ajudadas",
      value: volunteerStats.peopleHelped,
      color: "#253044",
    },
    {
      label: "Pedidos concluídos",
      value: volunteerStats.completedOrders,
      color: "#96C0BE",
    },
    {
      label: "Avaliação média",
      value: volunteerStats.averageRating.toFixed(1),
      color: "#f0b4a3",
    },
  ];

  return (
    <Card
      variant="outlined"
      sx={{
        p: 2.6,
        bgcolor: "#fff",
        borderColor: "#eceef2",
        borderRadius: 3,
        boxShadow: "0 1px 2px rgba(37, 48, 68, 0.03)",
      }}
    >
      <Typography sx={{ color: "#20283a", fontSize: 18, fontWeight: 800, mb: 2.4 }}>
        Suas Estatísticas
      </Typography>

      <Stack spacing={2.2}>
        {statsRows.map((stat) => (
          <Box
            key={stat.label}
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
            <Typography sx={{ color: stat.color, fontSize: 18, fontWeight: 900 }}>
              {stat.value}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Card>
  );
}

export default VolunteerStatsCard;
