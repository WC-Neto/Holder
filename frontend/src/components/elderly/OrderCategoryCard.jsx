import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

const OrderCategoryCard = ({ title, icon, isSelected, onClick }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        borderColor: isSelected ? "#8ab9b6" : "#e7e7ea",
        bgcolor: isSelected ? "rgba(150, 192, 190, 0.15)" : "background.paper",
        boxShadow: isSelected
          ? "0 0 0 2px rgba(138, 185, 182, 0.4)"
          : "0 2px 8px rgba(31, 41, 55, 0.08)",
        transition: "all 0.2s ease-in-out",
        height: "100%",
        "&:hover": {
          borderColor: "#8ab9b6",
          boxShadow: "0 4px 12px rgba(31, 41, 55, 0.12)",
        },
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{
          height: "100%",
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardContent
          sx={{
            p: 0,
            "&:last-child": { pb: 0 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              mb: 1.5,
              color: isSelected ? "#8ab9b6" : "#9ba3b3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </Box>
          <Typography
            variant="body1"
            align="center"
            fontWeight={isSelected ? 600 : 500}
            sx={{
              color: isSelected ? "#253044" : "#9ba3b3",
            }}
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default OrderCategoryCard;
