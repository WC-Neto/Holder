import React from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";

function VolunteerProfileStats({ stats = {} }) {
  const rows = [
    { label: "Ajudas", value: stats.helps ?? 0 },
    { label: "Idosos", value: stats.elders ?? 0 },
    { label: "Avaliação", value: Number(stats.rating ?? 0).toFixed(1) },
  ];

  return (
    <Stack direction="row" sx={{ alignItems: "center", px: 2.5, py: 2.2 }}>
      {rows.map((row, index) => (
        <React.Fragment key={row.label}>
          <Box sx={{ flex: 1, textAlign: "center" }}>
            <Typography sx={{ color: "#96C0BE", fontSize: 25, fontWeight: 900 }}>
              {row.value}
            </Typography>
            <Typography sx={{ color: "#98a1b0", fontSize: 13 }}>
              {row.label}
            </Typography>
          </Box>
          {index < rows.length - 1 && <Divider flexItem orientation="vertical" />}
        </React.Fragment>
      ))}
    </Stack>
  );
}

export default VolunteerProfileStats;
