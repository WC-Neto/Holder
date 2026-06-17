import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./home";
import ElderlyNewOrderPage from "./components/elderly/pages/ElderlyNewOrderPage";
import VolunteerLayout from "./components/volunteer/VolunteerLayout";
import { logout } from "./services/authSession";
import {
  clearCurrentMockUser,
  getCurrentMockUser,
} from "./services/mockUserService";

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => getCurrentMockUser());

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("isDarkMode") === "true";
  });

  const handleToggleTheme = () => {
    setIsDarkMode((current) => {
      const nextValue = !current;
      localStorage.setItem("isDarkMode", String(nextValue));
      return nextValue;
    });
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    clearCurrentMockUser();
    logout();
    setCurrentUser(null);
  };

  return (
    <>
      <CssBaseline />
      {currentUser?.type === "voluntario" ? (
        <VolunteerLayout
          currentUser={currentUser}
          onLogout={handleLogout}
          isDarkMode={isDarkMode}
          onToggleTheme={handleToggleTheme}
        />
      ) : currentUser?.type === "idoso" ? (
        <Box sx={{ minHeight: "100vh", bgcolor: "#fafafa" }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
            <Button
              variant="outlined"
              onClick={handleLogout}
              sx={{ textTransform: "none", fontWeight: 700 }}
            >
              Sair
            </Button>
          </Box>
          <ElderlyNewOrderPage currentUser={currentUser} />
        </Box>
      ) : (
        <Home onLogin={handleLogin} />
      )}
    </>
  );
}
