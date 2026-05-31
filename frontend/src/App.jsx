import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./home";
import VolunteerLayout from "./components/volunteer/VolunteerLayout";
import { logout } from "./services/authSession";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        <VolunteerLayout onLogout={handleLogout} />
      ) : (
        <Home onLogin={handleLogin} />
      )}
    </>
  );
}
