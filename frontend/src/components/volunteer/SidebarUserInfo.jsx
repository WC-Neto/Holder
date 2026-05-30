import React from "react";
import { Box, Typography, Avatar } from "@mui/material";

function SidebarUserInfo() {
  const user = {
    name: "Ana Santos",
    type: "Voluntário",
    avatar: "https://via.placeholder.com/40?text=AS",
  };

  return (
    <Box
      sx={{
        p: 2,
        borderBottom: "1px solid #e7e7ea",
        display: "flex",
        alignItems: "center",
        gap: 1.5,
      }}
    >
      <Avatar
        src={user.avatar}
        sx={{
          width: 40,
          height: 40,
          bgcolor: "#96C0BE",
        }}
      >
        {user.name.charAt(0)}
      </Avatar>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 600,
            color: "#253044",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {user.name}
        </Typography>
        <Typography
          sx={{
            fontSize: 11,
            color: "#9ba3b3",
            fontWeight: 500,
          }}
        >
          {user.type}
        </Typography>
      </Box>
    </Box>
  );
}

export default SidebarUserInfo;
