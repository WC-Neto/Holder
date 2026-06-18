import React from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useThemeMode } from "../../contexts/ThemeContext";

function SettingsMenuItem({
  icon: Icon,
  title,
  description,
  onClick,
  isDestructive = false,
}) {
  const { isDarkMode } = useThemeMode();

  const mainColor = isDestructive ? "#ff4d4f" : isDarkMode ? "#f8fafc" : "#20283a";
  const iconColor = isDestructive ? "#ff4d4f" : "#96C0BE";
  const iconBackground = isDestructive
    ? isDarkMode ? "#3d1a1a" : "#ffe8ea"
    : isDarkMode ? "#1a3a3a" : "#eef8f7";

  return (
    <Stack
      component="button"
      type="button"
      direction="row"
      spacing={1.5}
      onClick={onClick}
      aria-label={`Abrir ${title}`}
      sx={{
        alignItems: "center",
        width: "100%",
        px: 2,
        py: 1.8,
        border: 0,
        bgcolor: "transparent",
        cursor: "pointer",
        textAlign: "left",
        "&:hover": {
          bgcolor: isDestructive
            ? isDarkMode ? "#2d1a1a" : "#fff7f7"
            : isDarkMode ? "#253044" : "#fbfbfc",
        },
        "&:focus-within": {
          outline: "2px solid #96C0BE",
          outlineOffset: -2,
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
          bgcolor: iconBackground,
          color: iconColor,
          flexShrink: 0,
        }}
      >
        {Icon && <Icon sx={{ fontSize: 22 }} />}
      </Box>

      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography sx={{ color: mainColor, fontSize: 15, fontWeight: 800 }}>
          {title}
        </Typography>
        {description && (
          <Typography sx={{ color: isDarkMode ? "#a8b3c7" : "#98a1b0", fontSize: 12 }}>
            {description}
          </Typography>
        )}
      </Box>

      <IconButton component="span" size="small" tabIndex={-1} aria-hidden="true">
        <ChevronRightIcon sx={{ color: isDarkMode ? "#a8b3c7" : "#98a1b0" }} />
      </IconButton>
    </Stack>
  );
}

export default SettingsMenuItem;
