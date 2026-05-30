import React from "react";
import { Avatar, Box, Typography } from "@mui/material";

function SidebarUserInfo() {
  const user = {
    name: "Ana Santos",
    type: "Voluntário",
    avatar: "https://i.pravatar.cc/80?img=47",
  };

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
        src={user.avatar}
        sx={{
          width: 44,
          height: 44,
          bgcolor: "#96C0BE",
          border: "2px solid #96C0BE",
        }}
      >
        {user.name.charAt(0)}
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
          {user.name}
        </Typography>
        <Typography sx={{ color: "#98a1b0", fontSize: 13 }}>
          {user.type}
        </Typography>
      </Box>
    </Box>
  );
}

export default SidebarUserInfo;
