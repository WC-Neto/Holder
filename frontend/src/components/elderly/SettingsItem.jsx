import React from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function SettingsItem({
  icon: Icon,
  title,
  description,
  onClick,
  isDestructive = false,
}) {
  const mainColor = isDestructive ? "#ef3f4d" : "#20283a";
  const iconColor = isDestructive ? "#ef3f4d" : "#96C0BE";
  const iconBackground = isDestructive ? "#ffe8ea" : "#eef8f7";

  return (
    <Stack
      component="button"
      type="button"
      direction="row"
      spacing={2}
      onClick={onClick}
      sx={{
        alignItems: "center",
        width: "100%",
        px: 2,
        py: 2,
        border: 0,
        bgcolor: "transparent",
        cursor: "pointer",
        textAlign: "left",
        "&:hover": {
          bgcolor: isDestructive ? "#fff7f7" : "#fbfbfc",
        },
        "&:focus-within": {
          outline: "2px solid #96C0BE",
          outlineOffset: -2,
        },
      }}
    >
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          bgcolor: iconBackground,
          color: iconColor,
          flexShrink: 0,
        }}
      >
        {Icon && <Icon sx={{ fontSize: 24 }} />}
      </Box>

      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography sx={{ color: mainColor, fontSize: 16, fontWeight: 800 }}>
          {title}
        </Typography>
        {description && (
          <Typography sx={{ color: "#98a1b0", fontSize: 13, mt: 0.5 }}>
            {description}
          </Typography>
        )}
      </Box>

      {!isDestructive && (
        <IconButton component="span" size="small" tabIndex={-1}>
          <ChevronRightIcon sx={{ color: "#98a1b0" }} />
        </IconButton>
      )}
    </Stack>
  );
}

export default SettingsItem;
