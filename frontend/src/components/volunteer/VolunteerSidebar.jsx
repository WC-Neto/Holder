import React from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Drawer,
  IconButton,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutButton from "../shared/LogoutButton";
import SidebarMenuItem from "../shared/SidebarMenuItem";
import SidebarUserInfo from "../shared/SidebarUserInfo";
import logo from "../../assets/logo.png";

const menuItems = [
  { id: "inicio", label: "Início", icon: <HomeOutlinedIcon /> },
  { id: "historico", label: "Histórico", icon: <HistoryOutlinedIcon /> },
  { id: "idosos", label: "Idosos", icon: <PeopleAltOutlinedIcon /> },
  { id: "perfil", label: "Perfil", icon: <PersonOutlineOutlinedIcon /> },
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
        bgcolor: "#fff",
        borderRight: "1px solid #eef0f4",
      }}
    >
      <Box
        sx={{
          p: 2,
          borderBottom: "1px solid #eef0f4",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box component="img" src={logo} alt="Holder" sx={{ width: 40, height: 40 }} />
        <Box sx={{ color: "#8ab9b6", fontSize: 18, fontWeight: 800 }}>Holder</Box>
      </Box>

      <SidebarUserInfo 
        userName="Ana Santos"
        userRole="Voluntário"
        userImage="https://i.pravatar.cc/80?img=47"
      />

      <Box sx={{ flex: 1, py: 2, px: 1.5, overflowY: "auto" }}>
        {menuItems.map((item) => (
          <SidebarMenuItem
            key={item.id}
            title={item.label}
            icon={item.icon}
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

      <Box sx={{ p: 2, borderTop: "1px solid #eef0f4" }}>
        <LogoutButton onLogout={onLogout} />
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <>
        <IconButton
          aria-label="Abrir menu lateral"
          onClick={handleDrawerToggle}
          sx={{
            position: "fixed",
            left: 16,
            bottom: 84,
            zIndex: (theme) => theme.zIndex.drawer + 2,
            display: { xs: "inline-flex", sm: "none" },
            width: 48,
            height: 48,
            bgcolor: "#fff",
            color: "#253044",
            border: "1px solid #eef0f4",
            boxShadow: "0 10px 28px rgba(37, 48, 68, 0.16)",
            "&:hover": {
              bgcolor: "#f7fbfb",
            },
          }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              width: 250,
              maxWidth: "82vw",
              boxSizing: "border-box",
            },
          }}
        >
          {sidebarContent}
        </Drawer>

        <Paper
          elevation={8}
          sx={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: (theme) => theme.zIndex.drawer + 1,
            display: { xs: "flex", sm: "none" },
            borderTop: "1px solid #eef0f4",
          }}
        >
          <BottomNavigation
            showLabels
            value={currentPage}
            onChange={(_, nextPage) => {
              if (nextPage !== "logout") {
                onPageChange(nextPage);
              }
            }}
            sx={{ width: "100%", height: 68 }}
          >
            {menuItems.map((item) => (
              <BottomNavigationAction
                key={item.id}
                value={item.id}
                label={item.label}
                icon={item.icon}
                sx={{
                  minWidth: 0,
                  color: "#667085",
                  "&.Mui-selected": { color: "#96C0BE" },
                  "& .MuiBottomNavigationAction-label": {
                    fontSize: 11,
                    fontWeight: 800,
                  },
                }}
              />
            ))}
            <BottomNavigationAction
              value="logout"
              label="Sair"
              icon={<LogoutOutlinedIcon />}
              onClick={onLogout}
              sx={{
                minWidth: 0,
                color: "#e6a0a8",
                "& .MuiBottomNavigationAction-label": {
                  fontSize: 11,
                  fontWeight: 800,
                },
              }}
            />
          </BottomNavigation>
        </Paper>
      </>
    );
  }

  return (
    <Box
      sx={{
        width: 250,
        position: "fixed",
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
