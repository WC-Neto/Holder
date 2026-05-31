import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
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

      <Dialog
        open={isLogoutConfirmOpen}
        onClose={handleCancelLogout}
        aria-labelledby="logout-confirm-title"
      >
        <DialogTitle id="logout-confirm-title" sx={{ color: "#20283a", fontWeight: 900 }}>
          Sair da conta?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#667085" }}>
            Sua sessão local será encerrada e você voltará para a tela de login.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCancelLogout} sx={{ textTransform: "none" }}>
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmLogout}
            variant="contained"
            sx={{
              bgcolor: "#ff4d4f",
              boxShadow: "none",
              fontWeight: 800,
              textTransform: "none",
              "&:hover": {
                bgcolor: "#e04446",
                boxShadow: "none",
              },
            }}
          >
            Sair
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default VolunteerLayout;
