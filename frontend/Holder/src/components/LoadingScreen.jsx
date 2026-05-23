import React from "react";
import Box from "@mui/material/Box";
import logo from "../assets/logo.png";
import CircularLoader from "./CircularLoader";

const LoadingScreen = () => (
  <Box
    sx={{
      minHeight: "100vh",
      bgcolor: "#fff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100vw",
    }}
  >
    <Box
      component="img"
      src={logo}
      alt="Holder Logo"
      sx={{
        maxWidth: { xs: "80vw", sm: "60vw" },
        maxHeight: { xs: "20vh", sm: "30vh" },
        width: "auto",
        height: "auto",
        mb: 4,
      }}
    />
    <CircularLoader size={56} />
  </Box>
);

export default LoadingScreen;
