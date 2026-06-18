import React from "react";
import Box from "@mui/material/Box";
import ColumnLeft from "./components/home/ColumnLeft";
import ColumnRight from "./components/home/ColumnRight";

function Home({ onLogin }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        bgcolor: "#fafafa",
      }}
    >
      <ColumnLeft />
      <ColumnRight onLogin={(role) => onLogin && onLogin(role)} />
    </Box>
  );
}

export default Home;
