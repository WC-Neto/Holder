import React from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function SettingsItem({ icon: Icon, title, description, onClick }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1.5}
      onClick={onClick}
      sx={{
        px: 2,
        py: 1.8,
        cursor: "pointer",
        "&:hover": {
          bgcolor: "#fbfbfc",
        },
      }}
    >
      <Box
        sx={{
          width: 42,
          height: 42,
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          bgcolor: "#eef8f7",
          color: "#96C0BE",
          flexShrink: 0,
        }}
      >
        {Icon && <Icon sx={{ fontSize: 22 }} />}
      </Box>

      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography sx={{ color: "#20283a", fontSize: 15, fontWeight: 800 }}>
          {title}
        </Typography>
        <Typography sx={{ color: "#98a1b0", fontSize: 12 }}>
          {description}
        </Typography>
      </Box>

      <IconButton size="small" aria-label={`Abrir ${title}`}>
        <ChevronRightIcon sx={{ color: "#98a1b0" }} />
      </IconButton>
    </Stack>
  );
}

export default SettingsItem;
