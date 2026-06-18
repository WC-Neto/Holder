import React from "react";
import { Card, Divider, Stack, Typography } from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import SettingsMenuItem from "./SettingsMenuItem";
import { useThemeMode } from "../../contexts/ThemeContext";

export const settingsMenuOptions = [
  {
    id: "notifications",
    title: "Notificações",
    description: "Gerenciar alertas e sons",
    icon: NotificationsNoneOutlinedIcon,
    route: "/voluntario/perfil/notificacoes",
  },
  {
    id: "availability",
    title: "Disponibilidade",
    description: "Alterar horários",
    icon: AccessTimeOutlinedIcon,
    route: "/voluntario/perfil/disponibilidade",
  },
  {
    id: "privacy",
    title: "Privacidade",
    description: "Controle de dados",
    icon: ShieldOutlinedIcon,
    route: "/voluntario/perfil/privacidade",
  },
  {
    id: "help",
    title: "Ajuda e Suporte",
    description: "Dúvidas frequentes",
    icon: HelpOutlineOutlinedIcon,
    route: "/voluntario/perfil/ajuda",
  },
];

function VolunteerSettingsMenu({ onNavigate, onLogout }) {
  const { isDarkMode } = useThemeMode();

  const handleNavigate = (item) => {
    onNavigate?.(item.route, item);
  };

  const cardSx = {
    bgcolor: isDarkMode ? "#1e293b" : "#fff",
    borderColor: isDarkMode ? "#253044" : "#eceef2",
    borderRadius: 3,
    boxShadow: "0 1px 2px rgba(37, 48, 68, 0.03)",
    overflow: "hidden",
  };

  const dividerSx = { borderColor: isDarkMode ? "#253044" : undefined };

  return (
    <Stack spacing={2}>
      <Card variant="outlined" sx={cardSx}>
        <Typography
          component="h2"
          sx={{
            px: 2.4,
            py: 2,
            color: isDarkMode ? "#f8fafc" : "#20283a",
            fontSize: 18,
            fontWeight: 900,
          }}
        >
          Configurações
        </Typography>

        <Divider sx={dividerSx} />

        {settingsMenuOptions.map((item, index) => (
          <React.Fragment key={item.id}>
            <SettingsMenuItem {...item} onClick={() => handleNavigate(item)} />
            {index < settingsMenuOptions.length - 1 && <Divider sx={dividerSx} />}
          </React.Fragment>
        ))}
      </Card>

      <Card variant="outlined" sx={cardSx}>
        <SettingsMenuItem
          icon={LogoutOutlinedIcon}
          title="Sair da Conta"
          onClick={onLogout}
          isDestructive
        />
      </Card>
    </Stack>
  );
}

export default VolunteerSettingsMenu;
