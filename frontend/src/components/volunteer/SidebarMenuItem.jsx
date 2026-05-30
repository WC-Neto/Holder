import React from "react";
import { Box, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";

const iconMap = {
  home: HomeIcon,
  history: HistoryIcon,
  people: PeopleIcon,
  person: PersonIcon,
};

function SidebarMenuItem({ item, isActive, onClick }) {
  const Icon = iconMap[item.icon];

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
      {Icon && <Icon sx={{ fontSize: 20, flexShrink: 0 }} />}
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: isActive ? 600 : 500,
          color: "inherit",
        }}
      >
        {item.label}
      </Typography>
    </Box>
  );
}

export default SidebarMenuItem;
