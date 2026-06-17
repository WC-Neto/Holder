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
        bgcolor: isSelected ? "#96C0BE26" : "background.paper",
        boxShadow: isSelected
          ? "0 0 0 2px #8ab9b666"
          : "0 2px 8px #1f293714",
        transition: "all 0.2s ease-in-out",
        height: "100%",
        flex: 1,
        minWidth: "110px",
        "&:hover": {
          borderColor: "#8ab9b6",
          boxShadow: "0 4px 12px #1f29371e",
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
