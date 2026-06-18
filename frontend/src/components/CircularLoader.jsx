import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const CircularLoader = ({ size = 48, color = "secondary", ...props }) => (
  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
    <CircularProgress size={size} color={color} {...props} />
  </Box>
);

export default CircularLoader;
