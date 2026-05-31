import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import EditVolunteerProfileForm from "../EditVolunteerProfileForm";
import VolunteerProfileCard from "../VolunteerProfileCard";
import VolunteerSettingsMenu from "../VolunteerSettingsMenu";
import {
  buildVolunteerProfileQueryParams,
  getVolunteerProfile,
  updateVolunteerProfile,
} from "../../../services/volunteerProfile";

const MOCK_VOLUNTEER_ID = 1;
const profilePageCopy = {
  settingsTitle: "Configurações",
  logoutLabel: "Sair da Conta",
  versionLabel: "Versão 1.0.0",
};

function VolunteerProfilePage({ onLogout }) {
  const [profileData, setProfileData] = useState(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileFeedback, setProfileFeedback] = useState(null);

  useEffect(() => {
    const profileQueryParams = buildVolunteerProfileQueryParams({
      volunteerId: MOCK_VOLUNTEER_ID,
    });

    getVolunteerProfile(profileQueryParams).then(setProfileData);
  }, []);

  const handleEditProfile = () => {
    setIsEditProfileOpen(true);
  };

  const handleCloseEditProfile = () => {
    if (!isSavingProfile) {
      setIsEditProfileOpen(false);
    }
  };

  const handleSaveProfile = async (updates) => {
    setIsSavingProfile(true);

    try {
      const updatedProfile = await updateVolunteerProfile({
        volunteerId: MOCK_VOLUNTEER_ID,
        updates,
      });

      setProfileData(updatedProfile);
      setProfileFeedback({
        severity: "success",
        message: "Perfil atualizado com sucesso.",
      });
      setIsEditProfileOpen(false);
    } catch (error) {
      setProfileFeedback({
        severity: "error",
        message: error?.message ?? "Não foi possível atualizar o perfil.",
      });
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleSettingsNavigate = (route, item) => {
    setProfileFeedback({
      severity: "info",
      message: `Navegação preparada para ${item.title}.`,
      route,
    });
  };

  return (
    <Box
      sx={{
        px: { xs: 2, md: 4 },
        py: { xs: 3, md: 3.5 },
        minHeight: "100vh",
        bgcolor: "#fbfbfc",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <VolunteerProfileCard
            profile={profileData}
            onEditProfile={handleEditProfile}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <VolunteerSettingsMenu
            onNavigate={handleSettingsNavigate}
            onLogout={onLogout}
          />
          <Typography
            sx={{
              color: "#98a1b0",
              fontSize: 12,
              textAlign: "center",
              mt: 3,
            }}
          >
            Versão {profileData?.appVersion ?? profilePageCopy.versionLabel.replace("Versão ", "")}
          </Typography>
        </Grid>
      </Grid>

      <Dialog
        open={isEditProfileOpen}
        onClose={handleCloseEditProfile}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ color: "#20283a", fontWeight: 900 }}>
          Editar Perfil
        </DialogTitle>
        <DialogContent>
          <EditVolunteerProfileForm
            profile={profileData}
            isSaving={isSavingProfile}
            onCancel={handleCloseEditProfile}
            onSave={handleSaveProfile}
          />
        </DialogContent>
      </Dialog>

      <Snackbar
        open={Boolean(profileFeedback)}
        autoHideDuration={3000}
        onClose={() => setProfileFeedback(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={profileFeedback?.severity ?? "success"}
          variant="filled"
          onClose={() => setProfileFeedback(null)}
        >
          {profileFeedback?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default VolunteerProfilePage;
