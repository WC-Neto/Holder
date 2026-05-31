import React from "react";
import { Box, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function NearbyElderlyBanner({ nearbyCount = 0 }) {
  return (
    <Box
      sx={{
        minHeight: 40,
        px: 3,
        py: 1.2,
        bgcolor: "#f7ecee",
        color: "#d99da8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        borderTop: "1px solid #f0dde1",
        borderBottom: "1px solid #f0dde1",
      }}
    >
      <FavoriteBorderIcon sx={{ fontSize: 19 }} />
      <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
        {nearbyCount} idosos precisam de ajuda perto de você
      </Typography>
    </Box>
  );
}

export default NearbyElderlyBanner;
