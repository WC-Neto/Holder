import React, { createContext, useContext, useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeToggleContext = createContext({ isDarkMode: false, toggleTheme: () => {} });

export function useThemeMode() {
  return useContext(ThemeToggleContext);
}

export function AppThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? "dark" : "light",
          background: {
            default: isDarkMode ? "#0f172a" : "#fbfbfc",
            paper: isDarkMode ? "#1e293b" : "#ffffff",
          },
          text: {
            primary: isDarkMode ? "#f8fafc" : "#20283a",
            secondary: isDarkMode ? "#a8b3c7" : "#99a2b2",
          },
        },
      }),
    [isDarkMode],
  );

  return (
    <ThemeToggleContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
}