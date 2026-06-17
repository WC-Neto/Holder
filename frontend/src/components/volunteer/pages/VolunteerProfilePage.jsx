import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Snackbar,
  Typography,
} from "@mui/material";
import EditAvailabilityForm from "../EditAvailabilityForm";
import EditVolunteerProfileForm from "../EditVolunteerProfileForm";
import VolunteerProfileCard from "../VolunteerProfileCard";
import VolunteerSettingsMenu from "../VolunteerSettingsMenu";
import {
  buildVolunteerProfileQueryParams,
  getVolunteerProfile,
  updateVolunteerAvailability,
  updateVolunteerProfile,
} from "../../../services/volunteerProfile";

const profilePageCopy = {
  versionLabel: "Versão 1.0.0",
};

function VolunteerProfilePage({ volunteerId = 1, onLogout, isDarkMode = false }) {
  const [profileData, setProfileData] = useState(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isEditAvailabilityOpen, setIsEditAvailabilityOpen] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingAvailability, setIsSavingAvailability] = useState(false);
  const [profileFeedback, setProfileFeedback] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const profileQueryParams = buildVolunteerProfileQueryParams({
      volunteerId,
    });

    getVolunteerProfile(profileQueryParams).then((profile) => {
      if (isMounted) {
        setProfileData(profile);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [volunteerId]);

  const handleEditProfile = () => {
    setIsEditProfileOpen(true);
  };

  const handleCloseEditProfile = () => {
    if (!isSavingProfile) {
      setIsEditProfileOpen(false);
    }
  };

  const handleCloseEditAvailability = () => {
    if (!isSavingAvailability) {
      setIsEditAvailabilityOpen(false);
    }
  };

  const handleSaveProfile = async (updates) => {
    setIsSavingProfile(true);

    try {
      const updatedProfile = await updateVolunteerProfile({
        volunteerId,
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
    if (item.id === "availability") {
      setIsEditAvailabilityOpen(true);
      return;
    }

    setProfileFeedback({
      severity: "info",
      message: `Navegação preparada para ${item.title}.`,
      route,
    });
  };

  const handleSaveAvailability = async (availability) => {
    setIsSavingAvailability(true);

    try {
      const updatedProfile = await updateVolunteerAvailability({
        volunteerId,
        availability,
      });

      setProfileData(updatedProfile);
      setProfileFeedback({
        severity: "success",
        message: "Disponibilidade atualizada com sucesso.",
      });
      setIsEditAvailabilityOpen(false);
    } catch (error) {
      setProfileFeedback({
        severity: "error",
        message: error?.message ?? "Não foi possível atualizar a disponibilidade.",
      });
    } finally {
      setIsSavingAvailability(false);
    }
  };

  return (
    <Box
      sx={{
        px: { xs: 2, md: 4 },
        py: { xs: 3, md: 3.5 },
        minHeight: "100vh",
        maxWidth: "100%",
        bgcolor: isDarkMode ? "#0f172a" : "#fbfbfc",
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "minmax(340px, 0.9fr) minmax(420px, 1.3fr)",
            xl: "minmax(420px, 0.9fr) minmax(560px, 1.5fr)",
          },
          gap: 3,
          alignItems: "start",
          width: "100%",
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <VolunteerProfileCard
            profile={profileData}
            onEditProfile={handleEditProfile}
          />
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <VolunteerSettingsMenu
            onNavigate={handleSettingsNavigate}
            onLogout={onLogout}
          />
          <Typography
            sx={{
              color: isDarkMode ? "#a8b3c7" : "#98a1b0",
              fontSize: 12,
              textAlign: "center",
              mt: 3,
            }}
          >
            Versão {profileData?.appVersion ?? profilePageCopy.versionLabel.replace("Versão ", "")}
          </Typography>
        </Box>
      </Box>

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

      <Dialog
        open={isEditAvailabilityOpen}
        onClose={handleCloseEditAvailability}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ color: "#20283a", fontWeight: 900 }}>
          Editar Disponibilidade
        </DialogTitle>
        <DialogContent>
          <EditAvailabilityForm
            availability={profileData?.availability ?? []}
            isSaving={isSavingAvailability}
            onCancel={handleCloseEditAvailability}
            onSave={handleSaveAvailability}
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
