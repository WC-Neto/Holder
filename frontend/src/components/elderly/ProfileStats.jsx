import React from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";

function ProfileStats({ stats = {} }) {
  const statItems = [
    { label: "Pedidos", value: stats.orders ?? 0 },
    { label: "Concluídos", value: stats.completed ?? 0 },
    { label: "Voluntários", value: stats.volunteers ?? 0 },
  ];

  return (
    <Stack direction="row" sx={{ alignItems: "center", px: 2, py: 2.5 }}>
      {statItems.map((item, index) => {
        return (
          <React.Fragment key={item.label}>
            <Box sx={{ flex: 1, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Typography sx={{ color: "#8ab9b6", fontSize: 28, fontWeight: 800, lineHeight: 1 }}>
                {item.value}
              </Typography>
              <Typography sx={{ color: "#98a1b0", fontSize: 13, mt: 0.5 }}>
                {item.label}
              </Typography>
            </Box>
            {index < statItems.length - 1 && <Divider flexItem orientation="vertical" />}
          </React.Fragment>
        );
      })}
    </Stack>
  );
}

export default ProfileStats;
