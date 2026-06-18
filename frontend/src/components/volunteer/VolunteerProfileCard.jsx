import React from "react";
import { Avatar, Box, Button, Card, Chip, Divider, Stack, Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import AvailabilityTags from "./AvailabilityTags";
import PersonalInfoList from "./PersonalInfoList";
import VolunteerProfileStats from "./VolunteerProfileStats";
import { useThemeMode } from "../../contexts/ThemeContext";

function VolunteerProfileCard({ profile, onEditProfile }) {
  const { isDarkMode } = useThemeMode();

  if (!profile) return null;

  return (
    <Card
      variant="outlined"
      sx={{
        bgcolor: isDarkMode ? "#1e293b" : "#fff",
        borderColor: isDarkMode ? "#253044" : "#eceef2",
        borderRadius: 3,
        boxShadow: "0 1px 2px rgba(37, 48, 68, 0.03)",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          minHeight: 276,
          px: 3,
          py: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          background: "linear-gradient(135deg, #a8c5ad 0%, #96C0BE 100%)",
          color: "#fff",
        }}
      >
        <Avatar
          src={profile.avatarUrl}
          alt={profile.name}
          sx={{ width: 94, height: 94, border: "4px solid rgba(255,255,255,0.92)", mb: 2 }}
        />
        <Typography sx={{ fontSize: 24, fontWeight: 900 }}>{profile.name}</Typography>
        <Typography sx={{ fontSize: 14, opacity: 0.9 }}>{profile.email}</Typography>

        <Stack direction="row" sx={{ flexWrap: { xs: "wrap", sm: "nowrap" }, mt: 3, alignItems: "center", gap: 1.5 }} >
          <Chip
            icon={<StarBorderOutlinedIcon />}
            label={profile.statusLabel ?? "Voluntário Ativo"}
            sx={{
              bgcolor: "rgba(255,255,255,0.18)",
              color: "#fff",
              fontWeight: 800,
              height: 36,
              "& .MuiChip-icon": { color: "#f0b4a3" },
            }}
          />
          <Button
            startIcon={<EditOutlinedIcon />}
            onClick={onEditProfile}
            sx={{
              height: 36,
              minHeight: 36,
              borderRadius: 999,
              px: 1.8,
              bgcolor: "rgba(255,255,255,0.18)",
              color: "#fff",
              fontWeight: 800,
              textTransform: "none",
              "&:hover": { bgcolor: "rgba(255,255,255,0.26)" },
              display: "flex",
              alignItems: "center",
            }}
          >
            Editar Perfil
          </Button>
        </Stack>
      </Box>

      <VolunteerProfileStats stats={profile.stats} />

      <Divider sx={{ borderColor: isDarkMode ? "#253044" : undefined }} />

      <Box sx={{ p: 2.6 }}>
        <Typography sx={{ color: isDarkMode ? "#f8fafc" : "#20283a", fontSize: 16, fontWeight: 900, mb: 1.5 }}>
          Disponibilidade
        </Typography>
        <AvailabilityTags availability={profile.availability} />

        <Typography sx={{ color: isDarkMode ? "#f8fafc" : "#20283a", fontSize: 16, fontWeight: 900, mt: 3, mb: 1.5 }}>
          Informações Pessoais
        </Typography>
        <PersonalInfoList personalInfo={profile.personalInfo} />
      </Box>
    </Card>
  );
}

export default VolunteerProfileCard;
