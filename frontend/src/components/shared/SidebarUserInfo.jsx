import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { useThemeMode } from "../../contexts/ThemeContext";

function SidebarUserInfo({ userName, userRole, userImage }) {
  const { isDarkMode } = useThemeMode();

  return (
    <Box
      sx={{
        p: 2,
        borderBottom: `1px solid ${isDarkMode ? "#253044" : "#eef0f4"}`,
        display: "flex",
        alignItems: "center",
        gap: 1.5,
      }}
    >
      <Avatar
        src={userImage}
        sx={{ width: 44, height: 44, bgcolor: "#96C0BE", border: "2px solid #96C0BE" }}
      >
        {userName ? userName.charAt(0) : ""}
      </Avatar>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            color: isDarkMode ? "#f8fafc" : "#20283a",
            fontSize: 15,
            fontWeight: 800,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {userName}
        </Typography>
        <Typography sx={{ color: isDarkMode ? "#a8b3c7" : "#98a1b0", fontSize: 13 }}>
          {userRole}
        </Typography>
      </Box>
    </Box>
  );
}

export default SidebarUserInfo;
