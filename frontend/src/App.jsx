import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./home";
import VolunteerLayout from "./components/volunteer/VolunteerLayout";
import { logout } from "./services/authSession";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
  };

  return (
    <>
      <CssBaseline />
      {isLoggedIn ? (
        <VolunteerLayout
          onLogout={handleLogout}
          isDarkMode={isDarkMode}
          onToggleTheme={handleToggleTheme}
        />
      ) : (
        <Home onLogin={handleLogin} />
      )}
    </>
  );
}