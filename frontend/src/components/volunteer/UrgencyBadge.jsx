import React from "react";
import { Chip } from "@mui/material";

const urgencyConfig = {
  high: {
    label: "ALTA URGÊNCIA",
    bgcolor: "#fde4e6",
    color: "#ef3f4d",
  },
  medium: {
    label: "MÉDIA URGÊNCIA",
    bgcolor: "#fff4de",
    color: "#c98218",
  },
  low: {
    label: "BAIXA URGÊNCIA",
    bgcolor: "#dcfbef",
    color: "#00a76f",
  },
};

function UrgencyBadge({ urgencyTone = "low", label }) {
  const config = urgencyConfig[urgencyTone] ?? urgencyConfig.low;

  return (
    <Chip
      label={label || config.label}
      size="small"
      sx={{
        bgcolor: config.bgcolor,
        color: config.color,
        height: 32,
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 800,
      }}
    />
  );
}

export default UrgencyBadge;
