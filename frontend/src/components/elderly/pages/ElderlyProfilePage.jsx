import React, { useState } from "react";
import { Alert, Box, Dialog, DialogContent, DialogTitle, Snackbar } from "@mui/material";
import ProfileSummaryCard from "../ProfileSummaryCard";
import SettingsList from "../SettingsList";
import EditAvailabilityForm from "../../volunteer/EditAvailabilityForm";
import EditVolunteerProfileForm from "../../volunteer/EditVolunteerProfileForm";

const MOCK_ELDERLY_PROFILE = {
  id: 1,
  name: "Sr. José",
  email: "jose.silva@email.com",
  avatarUrl: "",
  availability: ["Manhã"],
  stats: {
    orders: 42,
    completed: 38,
    volunteers: 12,
  },
  personalInfo: {
    phone: "(11) 98765-4321",
    address: "Rua das Flores, 123 - São Paulo, SP",
    birthDate: "15/04/1945",
  },
};

function ElderlyProfilePage({ onLogout, isDarkMode = false }) {
  const [profileData, setProfileData] = useState(MOCK_ELDERLY_PROFILE);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isEditAvailabilityOpen, setIsEditAvailabilityOpen] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingAvailability, setIsSavingAvailability] = useState(false);
  const [profileFeedback, setProfileFeedback] = useState(null);

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

  const handleSettingsNavigate = (item) => {
    if (item.id === "availability") {
      setIsEditAvailabilityOpen(true);
      return;
    }

    setProfileFeedback({
      severity: "info",
      message: `Navegação preparada para ${item.title}.`,
    });
  };

  const handleSaveProfile = async (updates) => {
    setIsSavingProfile(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProfileData(prev => ({
        ...prev,
        ...updates,
        personalInfo: {
          ...prev.personalInfo,
          ...updates.personalInfo,
        },
      }));
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

  const handleSaveAvailability = async (availability) => {
    setIsSavingAvailability(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProfileData(prev => ({ ...prev, availability }));
      setProfileFeedback({
        severity: "success",
        message: "Preferência de horário atualizada com sucesso.",
      });
      setIsEditAvailabilityOpen(false);
    } catch (error) {
      setProfileFeedback({
        severity: "error",
        message: error?.message ?? "Não foi possível atualizar a preferência de horário.",
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
          <ProfileSummaryCard
            profile={profileData}
            onEditProfile={handleEditProfile}
          />
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <SettingsList
            onNavigate={handleSettingsNavigate}
            onLogout={onLogout}
            versionLabel="Versão 1.2.0"
          />
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
            availabilityLabel="Preferência de Horário"
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
          Editar Preferência de Horário
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

export default ElderlyProfilePage;
