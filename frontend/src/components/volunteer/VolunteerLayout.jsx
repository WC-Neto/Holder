import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import VolunteerSidebar from "./VolunteerSidebar";
import VolunteerHomePage from "./pages/VolunteerHomePage";
import HistoricoPage from "./pages/HistoricoPage";
import IdososPage from "./pages/IdososPage";
import PerfilPage from "./pages/PerfilPage";

const volunteerPagePaths = {
  inicio: "/voluntario",
  historico: "/voluntario/historico",
  idosos: "/voluntario/idosos",
  perfil: "/voluntario/perfil",
};

function getVolunteerPageFromPath(pathname) {
  const matchedPage = Object.entries(volunteerPagePaths).find(
    ([, path]) => pathname === path,
  );

  return matchedPage?.[0] ?? "inicio";
}

function VolunteerLayout({ onLogout }) {
  const [currentPage, setCurrentPage] = useState(() =>
    getVolunteerPageFromPath(window.location.pathname),
  );

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

  const renderContent = () => {
    switch (currentPage) {
      case "inicio":
        return (
          <VolunteerHomePage
            nearbyEldersCount={3}
            onNavigateToElders={() => handlePageChange("idosos")}
          />
        );
      case "historico":
        return <HistoricoPage />;
      case "idosos":
        return <IdososPage />;
      case "perfil":
        return <PerfilPage />;
      default:
        return (
          <VolunteerHomePage
            nearbyEldersCount={3}
            onNavigateToElders={() => handlePageChange("idosos")}
          />
        );
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#fafafa" }}>
      <VolunteerSidebar
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onLogout={onLogout}
      />
      <Box
        component="main"
        sx={{
          flex: 1,
          ml: { xs: 0, sm: "250px" },
          transition: "margin-left 0.3s",
          overflowY: "auto",
        }}
      >
        {renderContent()}
      </Box>
    </Box>
  );
}

export default VolunteerLayout;
