import React from "react";
import Box from "@mui/material/Box";
import ColumnLeft from "./components/home/ColumnLeft";
import ColumnRight from "./components/home/ColumnRight";

function Home() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        bgcolor: "#fafafa",
      }}
    >
      <ColumnLeft />
      <ColumnRight />
    </Box>
  );
}

export default Home;
