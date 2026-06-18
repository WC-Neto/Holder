import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./home";
import VolunteerLayout from "./components/volunteer/VolunteerLayout";
import ElderlyLayout from "./components/elderly/ElderlyLayout";
import { logout } from "./services/authSession";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); //ver mock
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

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setUserRole(null);
  };

  return (
    <>
      <CssBaseline />
      {isLoggedIn ? (
        userRole === "voluntario" ? (
          <VolunteerLayout
            onLogout={handleLogout}
            isDarkMode={isDarkMode}
            onToggleTheme={handleToggleTheme}
          />
        ) : (
          <ElderlyLayout
            onLogout={handleLogout}
            isDarkMode={isDarkMode}
            onToggleTheme={handleToggleTheme}
          />
        )
      ) : (
        <Home onLogin={handleLogin} />
      )}
    </>
  );
}