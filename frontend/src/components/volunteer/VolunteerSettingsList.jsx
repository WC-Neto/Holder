import React from "react";
import { Card, Divider, Stack, Typography } from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import LogoutSettingsItem from "./LogoutSettingsItem";
import SettingsItem from "./SettingsItem";

const settingsItems = [
  {
    title: "Notificações",
    description: "Gerenciar alertas e sons",
    icon: NotificationsNoneOutlinedIcon,
  },
  {
    title: "Disponibilidade",
    description: "Alterar horários",
    icon: AccessTimeOutlinedIcon,
  },
  {
    title: "Privacidade",
    description: "Controle de dados",
    icon: ShieldOutlinedIcon,
  },
  {
    title: "Ajuda e Suporte",
    description: "Dúvidas frequentes",
    icon: HelpOutlineOutlinedIcon,
  },
];

function VolunteerSettingsList({ onLogout }) {
  return (
    <Stack spacing={2}>
      <Card
        variant="outlined"
        sx={{
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
            px: 2.4,
            py: 2,
            color: "#20283a",
            fontSize: 18,
            fontWeight: 900,
          }}
        >
          Configurações
        </Typography>

        <Divider />

        {settingsItems.map((item, index) => (
          <React.Fragment key={item.title}>
            <SettingsItem {...item} />
            {index < settingsItems.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </Card>

      <LogoutSettingsItem onLogout={onLogout} />
    </Stack>
  );
}

export default VolunteerSettingsList;
