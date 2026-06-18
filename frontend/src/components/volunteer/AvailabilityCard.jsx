import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NightsStayOutlinedIcon from "@mui/icons-material/NightsStayOutlined";
import WbTwilightOutlinedIcon from "@mui/icons-material/WbTwilightOutlined";

const availabilityIcons = {
  Manhã: LightModeOutlinedIcon,
  Tarde: WbTwilightOutlinedIcon,
  Noite: NightsStayOutlinedIcon,
};

function AvailabilityCard({ period, selected = false, onToggle }) {
  const PeriodIcon = availabilityIcons[period] ?? LightModeOutlinedIcon;

  return (
    <Stack
      component="button"
      type="button"
      onClick={() => onToggle?.(period)}
      aria-pressed={selected}
      direction="row"
      spacing={1.2}
      sx={{
        alignItems: "center",
        width: "100%",
        border: "1px solid",
        borderColor: selected ? "#96C0BE" : "#eceef2",
        borderRadius: 2,
        bgcolor: selected ? "#eef8f7" : "#fff",
        px: 1.5,
        py: 1.4,
        cursor: "pointer",
        textAlign: "left",
        transition: "border-color 160ms ease, background-color 160ms ease",
        "&:hover": {
          borderColor: "#96C0BE",
          bgcolor: "#f6fbfa",
        },
        "&:focus-visible": {
          outline: "2px solid #96C0BE",
          outlineOffset: 2,
        },
      }}
    >
      <Box
        sx={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          bgcolor: selected ? "#dcefed" : "#f3f7f7",
          color: "#88b8b5",
          flexShrink: 0,
        }}
      >
        <PeriodIcon sx={{ fontSize: 20 }} />
      </Box>

      <Typography sx={{ color: "#20283a", fontSize: 15, fontWeight: 800 }}>
        {period}
      </Typography>
    </Stack>
  );
}

export default AvailabilityCard;
