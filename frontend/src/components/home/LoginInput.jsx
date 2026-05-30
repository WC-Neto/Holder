import React from "react";
import { Box, InputBase, Typography } from "@mui/material";

function LoginInput({ label, placeholder, type = "text", icon, endIcon }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        sx={{
          mb: 1,
          color: "#253044",
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        {label}
      </Typography>

      <Box
        sx={{
          height: 48,
          display: "flex",
          alignItems: "center",
          gap: 1.2,
          px: 2,
          bgcolor: "#f4f4f6",
          borderRadius: 3,
        }}
      >
        <Typography sx={{ color: "#9aa3b2", fontSize: 18 }}>{icon}</Typography>

        <InputBase
          type={type}
          placeholder={placeholder}
          fullWidth
          sx={{
            color: "#253044",
            fontSize: 14,
            "& input::placeholder": {
              color: "#9aa3b2",
              opacity: 1,
            },
          }}
        />

        {endIcon && (
          <Typography sx={{ color: "#9aa3b2", fontSize: 18 }}>{endIcon}</Typography>
        )}
      </Box>
    </Box>
  );
}

export default LoginInput;
