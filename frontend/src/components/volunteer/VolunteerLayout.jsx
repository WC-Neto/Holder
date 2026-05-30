import React, { useState } from "react";
import { Box } from "@mui/material";
import VolunteerSidebar from "./VolunteerSidebar";
import VolunteerHomePage from "./pages/VolunteerHomePage";
import HistoricoPage from "./pages/HistoricoPage";
import IdososPage from "./pages/IdososPage";
import PerfilPage from "./pages/PerfilPage";

function VolunteerLayout({ onLogout }) {
  const [currentPage, setCurrentPage] = useState("inicio");

  const renderContent = () => {
    switch (currentPage) {
      case "inicio":
        return <VolunteerHomePage />;
      case "historico":
        return <HistoricoPage />;
      case "idosos":
        return <IdososPage />;
      case "perfil":
        return <PerfilPage />;
      default:
        return <VolunteerHomePage />;
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#fafafa" }}>
      <VolunteerSidebar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
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
