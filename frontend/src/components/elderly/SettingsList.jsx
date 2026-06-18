import React from "react";
import { Card, Divider, Stack, Typography } from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SettingsItem from "./SettingsItem";

const settingsOptions = [
  {
    id: "notifications",
    title: "Notificações",
    description: "Gerenciar alertas e sons",
    icon: NotificationsNoneOutlinedIcon,
  },
  {
    id: "availability",
    title: "Preferência de Horário",
    description: "Alterar horários",
    icon: AccessTimeOutlinedIcon,
  },
  {
    id: "privacy",
    title: "Privacidade",
    description: "Controle de dados",
    icon: ShieldOutlinedIcon,
  },
  {
    id: "help",
    title: "Ajuda e Suporte",
    description: "Dúvidas frequentes",
    icon: HelpOutlineOutlinedIcon,
  },
];

function SettingsList({ onNavigate, onLogout, versionLabel = "Versão 1.0.0" }) {
  const handleNavigate = (item) => {
    onNavigate?.(item);
  };

  return (
    <Stack spacing={0}>
      <Card
        variant="outlined"
        sx={{
          width: '100%',
          bgcolor: "#fff",
          borderColor: "#eceef2",
          borderRadius: 3,
          boxShadow: "0 1px 2px rgba(37, 48, 68, 0.03)",
          overflow: "hidden",
        }}
      >
        <Typography
          component="h2"
          sx={{
            px: 2.5,
            py: 2.2,
            color: "#20283a",
            fontSize: 18,
            fontWeight: 900,
          }}
        >
          Configurações
        </Typography>

        <Divider />

        {settingsOptions.map((item, index) => (
          <React.Fragment key={item.id}>
            <SettingsItem {...item} onClick={() => handleNavigate(item)} />
            {index < settingsOptions.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </Card>

      <Card
        variant="outlined"
        sx={{
          width: '100%',
          bgcolor: "#fff",
          borderColor: "#eceef2",
          borderRadius: 3,
          boxShadow: "0 1px 2px rgba(37, 48, 68, 0.03)",
          overflow: "hidden",
          mt: 3,
        }}
      >
        <SettingsItem
          icon={LogoutOutlinedIcon}
          title="Sair da Conta"
          onClick={onLogout}
          isDestructive
        />
      </Card>

      <Typography
        sx={{
          color: "#98a1b0",
          fontSize: 12,
          textAlign: "center",
          mt: 4,
          mb: 2,
        }}
      >
        {versionLabel}
      </Typography>
    </Stack>
  );
}

export default SettingsList;
