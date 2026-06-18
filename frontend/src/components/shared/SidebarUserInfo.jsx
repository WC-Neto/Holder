import React from "react";
import { Avatar, Box, Typography } from "@mui/material";

function SidebarUserInfo({ userName, userRole, userImage }) {
  return (
    <Box
      sx={{
        p: 2,
        borderBottom: "1px solid #eef0f4",
        display: "flex",
        alignItems: "center",
        gap: 1.5,
      }}
    >
      <Avatar
        src={userImage}
        sx={{
          width: 44,
          height: 44,
          bgcolor: "#96C0BE",
          border: "2px solid #96C0BE",
        }}
      >
        {userName ? userName.charAt(0) : ''}
      </Avatar>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            color: "#20283a",
            fontSize: 15,
            fontWeight: 800,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {userName}
        </Typography>
        <Typography sx={{ color: "#98a1b0", fontSize: 13 }}>
          {userRole}
        </Typography>
      </Box>
    </Box>
  );
}

export default SidebarUserInfo;
