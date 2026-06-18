import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
} from "@mui/material";
import LogoutConfirmModal from "../shared/LogoutConfirmModal";
import VolunteerSidebar from "./VolunteerSidebar";
import VolunteerHomePage from "./pages/VolunteerHomePage";
import VolunteerHistoryPage from "./pages/VolunteerHistoryPage";
import VolunteerElderlyNearbyPage from "./pages/VolunteerElderlyNearbyPage";
import VolunteerProfilePage from "./pages/VolunteerProfilePage";

const volunteerPagePaths = {
  inicio: "/voluntario",
  historico: "/voluntario/historico",
  idosos: "/voluntario/idosos",
  perfil: "/voluntario/perfil",
};
const loginRedirectPath = "/login";

function getVolunteerPageFromPath(pathname) {
  const matchedPage = Object.entries(volunteerPagePaths).find(
    ([, path]) => pathname === path,
  );

  return matchedPage?.[0] ?? "inicio";
}

function VolunteerLayout({ onLogout, isDarkMode, onToggleTheme }) {
  const [currentPage, setCurrentPage] = useState(() =>
    getVolunteerPageFromPath(window.location.pathname),
  );
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getVolunteerPageFromPath(window.location.pathname));
    };

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);

    const nextPath = volunteerPagePaths[page] ?? volunteerPagePaths.inicio;

    if (window.location.pathname !== nextPath) {
      window.history.pushState({ volunteerPage: page }, "", nextPath);
    }
  };

  const handleLogoutRequest = () => {
    setIsLogoutConfirmOpen(true);
  };

  const handleCancelLogout = () => {
    setIsLogoutConfirmOpen(false);
  };

  const handleConfirmLogout = () => {
    setIsLogoutConfirmOpen(false);
    onLogout?.({ redirectTo: loginRedirectPath });
  };

  const renderContent = () => {
    switch (currentPage) {
      case "inicio":
        return (
          <VolunteerHomePage
            nearbyEldersCount={3}
            onNavigateToElders={() => handlePageChange("idosos")}
            isDarkMode={isDarkMode}
            onToggleTheme={onToggleTheme}
          />
        );
      case "historico":
        return <VolunteerHistoryPage isDarkMode={isDarkMode} />;
      case "idosos":
        return <VolunteerElderlyNearbyPage isDarkMode={isDarkMode} />; case "perfil":
        return (
          <VolunteerProfilePage
            onLogout={handleLogoutRequest}
            isDarkMode={isDarkMode}
          />
        );
      default:
        return (
          <VolunteerHomePage
            nearbyEldersCount={3}
            onNavigateToElders={() => handlePageChange("idosos")}
            isDarkMode={isDarkMode}
            onToggleTheme={onToggleTheme}
          />
        );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        maxWidth: "100%",
        minHeight: "100vh",
        bgcolor: isDarkMode ? "#0f172a" : "#fafafa",
        colorScheme: isDarkMode ? "dark" : "light",
        overflowX: "hidden",
      }}
    >
      <VolunteerSidebar
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onLogout={handleLogoutRequest}
      />
      <Box
        component="main"
        sx={{
          flex: 1,
          minWidth: 0,
          ml: { xs: 0, sm: "250px" },
          pb: { xs: 9, sm: 0 },
          transition: "margin-left 0.3s",
          maxWidth: "100%",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {renderContent()}
      </Box>

      <LogoutConfirmModal
        open={isLogoutConfirmOpen}
        onClose={handleCancelLogout}
        onConfirm={handleConfirmLogout}
      />
    </Box>
  );
}

export default VolunteerLayout;
