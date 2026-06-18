import React from "react";
import { Avatar, Box, Button, Card, Divider, Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ProfileStats from "./ProfileStats";
import PersonalInfoList from "./PersonalInfoList";

function ProfileSummaryCard({ profile, onEditProfile }) {
  if (!profile) return null;

  return (
    <Card
      variant="outlined"
      sx={{
        bgcolor: "#fff",
        borderColor: "#eceef2",
        borderRadius: 3,
        boxShadow: "0 1px 2px #eceef2",
        overflow: "hidden",
        height: '100%',
      }}
    >
      <Box
        sx={{
          minHeight: 260,
          pt: 5,
          pb: 4,
          px: 2,
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
          sx={{
            width: 100,
            height: 100,
            border: "4px solid #ffffff",
            mb: 2,
            boxShadow: "0 4px 10px #20283a",
          }}
        />
        <Typography sx={{ fontSize: 24, fontWeight: 900, mb: 0.5 }}>
          {profile.name}
        </Typography>
        <Typography sx={{ fontSize: 14, opacity: 0.9, mb: 3 }}>
          {profile.email}
        </Typography>

        <Button
          variant="outlined"
          startIcon={<EditOutlinedIcon />}
          onClick={onEditProfile}
          sx={{
            height: 38,
            borderRadius: 999,
            px: 2.5,
            borderColor: "#ffffff",
            color: "#fff",
            fontWeight: 800,
            textTransform: "none",
            "&:hover": { 
              bgcolor: "#8ab9b6",
              borderColor: "#ffffff",
            },
          }}
        >
          Editar Perfil
        </Button>
      </Box>

      <ProfileStats stats={profile.stats} />

      <Divider />

      <Box sx={{ p: 3 }}>
        <Typography sx={{ color: "#20283a", fontSize: 16, fontWeight: 900, mb: 1 }}>
          Informações Pessoais
        </Typography>
        <PersonalInfoList personalInfo={profile.personalInfo} />
      </Box>
    </Card>
  );
}

export default ProfileSummaryCard;
