import React from "react";
import { Box, Typography } from "@mui/material";

function SidebarMenuItem({ title, icon, isActive, onClick }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        px: 2,
        py: 1.5,
        mb: 0.5,
        borderRadius: 1,
        cursor: "pointer",
        transition: "all 0.2s",
        backgroundColor: isActive ? "#96C0BE" : "transparent",
        color: isActive ? "#fff" : "#9ba3b3",
        "&:hover": {
          backgroundColor: isActive ? "#96C0BE" : "#f0f0f0",
          color: isActive ? "#fff" : "#253044",
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24 }}>
        {icon}
      </Box>
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: isActive ? 600 : 500,
          color: "inherit",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}

export default SidebarMenuItem;
