import React from "react";
import { Chip, Stack } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NightsStayOutlinedIcon from "@mui/icons-material/NightsStayOutlined";
import WbTwilightOutlinedIcon from "@mui/icons-material/WbTwilightOutlined";

const availabilityIcons = {
  Manhã: LightModeOutlinedIcon,
  Tarde: WbTwilightOutlinedIcon,
  Noite: NightsStayOutlinedIcon,
};

function AvailabilityTags({ availability = [] }) {
  const visibleAvailability = availability.length > 0 ? availability : ["Manhã", "Tarde", "Noite"];

  return (
    <Stack direction="row" flexWrap="wrap" gap={1}>
      {visibleAvailability.map((period) => {
        const PeriodIcon = availabilityIcons[period] ?? LightModeOutlinedIcon;

        return (
          <Chip
            key={period}
            icon={<PeriodIcon />}
            label={period}
            sx={{
              minHeight: 38,
              px: 0.8,
              bgcolor: "#eef8f7",
              color: "#88b8b5",
              fontWeight: 800,
              borderRadius: 999,
              "& .MuiChip-icon": {
                color: "#88b8b5",
              },
            }}
          />
        );
      })}
    </Stack>
  );
}

export default AvailabilityTags;
