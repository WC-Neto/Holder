import React from "react";
import { Box, Button, Card, Typography } from "@mui/material";

function CommunityCard({
  title,
  subtitle,
  buttonText,
  buttonColor = "#96C0BE",
  icon,
  iconBgColor = "#f7e9eb",
  onButtonClick,
}) {
  return (
    <Card
      variant="outlined"
      sx={{
        p: 2.6,
        bgcolor: "#fff",
        borderColor: "#eceef2",
        borderRadius: 3,
        boxShadow: "0 1px 2px #eceef2",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          minHeight: 128,
          borderRadius: 2,
          bgcolor: iconBgColor,
          display: "grid",
          placeItems: "center",
          mb: 2,
        }}
      >
        {icon}
      </Box>

      <Typography sx={{ color: "#20283a", fontSize: 20, fontWeight: 800, mb: 1 }}>
        {title}
      </Typography>

      <Typography sx={{ color: "#98a1b0", fontSize: 14, mb: 2.4 }}>
        {subtitle}
      </Typography>

      <Button
        variant="contained"
        fullWidth
        onClick={onButtonClick}
        sx={{
          minHeight: 48,
          borderRadius: 2,
          bgcolor: buttonColor,
          color: "#fff",
          fontWeight: 800,
          textTransform: "none",
          boxShadow: "none",
          "&:hover": {
            bgcolor: buttonColor,
            filter: "brightness(0.9)",
            boxShadow: "none",
          },
        }}
      >
        {buttonText}
      </Button>
    </Card>
  );
}

export default CommunityCard;
