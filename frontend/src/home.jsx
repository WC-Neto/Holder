import React, { useState } from "react";
import Box from "@mui/material/Box";
import ColumnLeft from "./components/home/ColumnLeft";
import ColumnRight from "./components/home/ColumnRight";
import ForgotPassword from "./components/home/ForgotPassword";
import RegisterUser from "./components/home/RegisterUser";

function Home({ onLogin }) {
  const [currentScreen, setCurrentScreen] = useState("login");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        bgcolor: "#fafafa",
      }}
    >
      <ColumnLeft />

      {currentScreen === "login" ? (
        <ColumnRight
          onLogin={onLogin}
          onForgotPassword={() => setCurrentScreen("forgotPassword")}
          onRegister={() => setCurrentScreen("register")}
        />
      ) : currentScreen === "forgotPassword" ? (
        <ForgotPassword onBackToLogin={() => setCurrentScreen("login")} />
      ) : (
        <RegisterUser onBackToLogin={() => setCurrentScreen("login")} />
      )}
    </Box>
  );
}

export default Home;
