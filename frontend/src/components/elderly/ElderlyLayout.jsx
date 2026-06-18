import React, { useState, useEffect } from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, useTheme, useMediaQuery, Drawer } from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlineOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

import ElderlyHomePage from './pages/ElderlyHomePage';
import ElderlyNewOrderPage from './pages/ElderlyNewOrderPage';
import ElderlyHistoryPage from './pages/ElderlyHistoryPage';
import ElderlyVolunteersPage from './pages/ElderlyVolunteersPage';
import ElderlyProfilePage from './pages/ElderlyProfilePage';

import SidebarMenuItem from '../shared/SidebarMenuItem';
import SidebarUserInfo from '../shared/SidebarUserInfo';
import LogoutButton from '../shared/LogoutButton';
import LogoutConfirmModal from '../shared/LogoutConfirmModal';
import logo from '../../assets/logo.png';

const menuItems = [
  { id: "inicio", label: "Início", icon: <HomeOutlinedIcon /> },
  { id: "novo-pedido", label: "Novo Pedido", icon: <AddCircleOutlineIcon /> },
  { id: "historico", label: "Histórico", icon: <HistoryOutlinedIcon /> },
  { id: "comunidade", label: "Comunidade", icon: <PeopleAltOutlinedIcon /> },
  { id: "perfil", label: "Perfil", icon: <PersonOutlineIcon /> },
];

const ElderlyLayout = ({ onLogout, isDarkMode, onToggleTheme }) => {
  const [currentPage, setCurrentPage] = useState(() => {
    const path = window.location.pathname;
    if (path === '/idoso/novo-pedido') return 'novo-pedido';
    if (path === '/idoso/historico') return 'historico';
    if (path === '/idoso/comunidade') return 'comunidade';
    if (path === '/idoso/perfil') return 'perfil';
    return 'inicio';
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

  const handleLogoutRequest = () => setIsLogoutConfirmOpen(true);
  const handleCancelLogout = () => setIsLogoutConfirmOpen(false);
  const handleConfirmLogout = () => {
    setIsLogoutConfirmOpen(false);
    onLogout?.({ redirectTo: "/login" });
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/idoso/novo-pedido') {
        setCurrentPage('novo-pedido');
      } else if (path === '/idoso/historico') {
        setCurrentPage('historico');
      } else if (path === '/idoso/comunidade') {
        setCurrentPage('comunidade');
      } else if (path === '/idoso/perfil') {
        setCurrentPage('perfil');
      } else {
        setCurrentPage('inicio');
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const nextPath = page === 'inicio' ? '/idoso' : `/idoso/${page}`;
    if (window.location.pathname !== nextPath) {
      window.history.pushState({ elderlyPage: page }, "", nextPath);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'inicio':
        return <ElderlyHomePage onNavigate={handlePageChange} />;
      case 'novo-pedido':
        return <ElderlyNewOrderPage />;
      case 'historico':
        return <ElderlyHistoryPage />;
      case 'comunidade':
        return <ElderlyVolunteersPage isDarkMode={isDarkMode} />;
      case 'perfil':
        return <ElderlyProfilePage isDarkMode={isDarkMode} onLogout={handleLogoutRequest} />;
      default:
        return <ElderlyHomePage onNavigate={handlePageChange} />;
    }
  };

  const sidebarContent = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        bgcolor: isDarkMode ? '#1e293b' : '#fff',
        borderRight: "1px solid",
        borderColor: isDarkMode ? '#334155' : '#eef0f4',
      }}
    >
      <Box
        sx={{
          p: 2,
          borderBottom: "1px solid",
          borderColor: isDarkMode ? '#334155' : '#eef0f4',
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box component="img" src={logo} alt="Holder" sx={{ width: 40, height: 40 }} />
        <Box sx={{ color: "#df9aa4", fontSize: 18, fontWeight: 800 }}>Holder</Box>
      </Box>

      <SidebarUserInfo
        userName="Sr. José"
        userRole="Idoso"
        userImage="https://i.pravatar.cc/80?img=11"
      />

      <Box sx={{ flex: 1, py: 2, px: 1.5, overflowY: "auto" }}>
        {menuItems.map((item) => (
          <SidebarMenuItem
            key={item.id}
            title={item.label}
            icon={item.icon}
            isActive={currentPage === item.id}
            onClick={() => {
              handlePageChange(item.id);
              if (isMobile) {
                setMobileOpen(false);
              }
            }}
          />
        ))}
      </Box>

      <Box sx={{ p: 2, borderTop: "1px solid", borderColor: isDarkMode ? '#334155' : '#eef0f4' }}>
        <LogoutButton onLogout={handleLogoutRequest} />
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: isDarkMode ? '#0f172a' : '#fafafa' }}>

      {/* MOBILE */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { width: 250, boxSizing: "border-box", bgcolor: isDarkMode ? '#1e293b' : '#fff' },
        }}
      >
        {sidebarContent}
      </Drawer>

      <Box
        component="nav"
        sx={{
          width: { sm: 250 },
          flexShrink: { sm: 0 },
          display: { xs: "none", sm: "block" },
        }}
      >
        <Box sx={{ width: 250, position: 'fixed', height: '100vh' }}>
          {sidebarContent}
        </Box>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: isDarkMode ? '#1e293b' : '#ffffff',
            borderBottom: '1px solid',
            borderColor: isDarkMode ? '#334155' : '#e7e7ea',
            display: { sm: 'none' }
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, color: isDarkMode ? '#9ba3b3' : '#253044' }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" fontWeight={800} sx={{ color: '#df9aa4' }}>HOLDER</Typography>
            <IconButton onClick={onToggleTheme} sx={{ color: isDarkMode ? '#9ba3b3' : '#253044' }}>
              {isDarkMode ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box sx={{ display: { xs: 'none', sm: 'block' }, position: 'absolute', top: 16, right: 24, zIndex: 10 }}>
          <IconButton onClick={onToggleTheme} sx={{ color: isDarkMode ? '#9ba3b3' : '#253044' }}>
            {isDarkMode ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
          </IconButton>
        </Box>

        {renderContent()}
      </Box>

      <LogoutConfirmModal
        open={isLogoutConfirmOpen}
        onClose={handleCancelLogout}
        onConfirm={handleConfirmLogout}
      />
    </Box>
  );
};

export default ElderlyLayout;
