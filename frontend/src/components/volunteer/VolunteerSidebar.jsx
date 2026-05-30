import React from "react";
import { Box, Drawer, useMediaQuery, useTheme } from "@mui/material";
import SidebarUserInfo from "./SidebarUserInfo";
import SidebarMenuItem from "./SidebarMenuItem";
import LogoutButton from "./LogoutButton";
import logo from "../../assets/logo.png";

const menuItems = [
  { id: "inicio", label: "Início", icon: "home" },
  { id: "historico", label: "Histórico", icon: "history" },
  { id: "idosos", label: "Idosos", icon: "people" },
  { id: "perfil", label: "Perfil", icon: "person" },
];

function VolunteerSidebar({ currentPage, onPageChange, onLogout }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const sidebarContent = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#f8f9fa",
        borderRight: "1px solid #e7e7ea",
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          p: 2,
          borderBottom: "1px solid #e7e7ea",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Holder"
          sx={{
            width: 40,
            height: 40,
          }}
        />
        <Box sx={{ color: "#9ba3b3", fontSize: 12 }}>Holder</Box>
      </Box>

      {/* User Info */}
      <SidebarUserInfo />

      {/* Menu Items */}
      <Box
        sx={{
          flex: 1,
          py: 2,
          px: 1,
          overflowY: "auto",
        }}
      >
        {menuItems.map((item) => (
          <SidebarMenuItem
            key={item.id}
            item={item}
            isActive={currentPage === item.id}
            onClick={() => {
              onPageChange(item.id);
              if (isMobile) {
                setMobileOpen(false);
              }
            }}
          />
        ))}
      </Box>

      {/* Logout Button */}
      <Box sx={{ p: 2, borderTop: "1px solid #e7e7ea" }}>
        <LogoutButton onLogout={onLogout} />
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: 250,
            boxSizing: "border-box",
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    );
  }

  return (
    <Box
      sx={{
        width: 250,
        position: { xs: "fixed", sm: "fixed" },
        height: "100vh",
        overflowY: "auto",
        display: { xs: "none", sm: "block" },
      }}
    >
      {sidebarContent}
    </Box>
  );
}

export default VolunteerSidebar;
