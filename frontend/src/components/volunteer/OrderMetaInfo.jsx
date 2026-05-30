import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

function OrderMetaInfo({ distance, neighborhood, timeAgo }) {
  return (
    <Stack direction="row" spacing={2} useFlexGap sx={{ flexWrap: "wrap" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <LocationOnOutlinedIcon sx={{ fontSize: 16, color: "#9aa5b5" }} />
        <Typography sx={{ color: "#8f99aa", fontSize: 13 }}>
          {distance} • {neighborhood}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <AccessTimeIcon sx={{ fontSize: 16, color: "#9aa5b5" }} />
        <Typography sx={{ color: "#8f99aa", fontSize: 13 }}>{timeAgo}</Typography>
      </Box>
    </Stack>
  );
}

export default OrderMetaInfo;
