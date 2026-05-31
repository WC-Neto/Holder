import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import VolunteerProfileCard from "../VolunteerProfileCard";
import VolunteerSettingsList from "../VolunteerSettingsList";
import {
  buildVolunteerProfileQueryParams,
  getVolunteerProfile,
} from "../../../services/volunteerProfile";

const MOCK_VOLUNTEER_ID = 1;
const profilePageCopy = {
  settingsTitle: "Configurações",
  logoutLabel: "Sair da Conta",
  versionLabel: "Versão 1.0.0",
};

function VolunteerProfilePage({ onLogout }) {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const profileQueryParams = buildVolunteerProfileQueryParams({
      volunteerId: MOCK_VOLUNTEER_ID,
    });

    getVolunteerProfile(profileQueryParams).then(setProfileData);
  }, []);

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
          <VolunteerProfileCard profile={profileData} />
        </Grid>

        <Grid item xs={12} md={8}>
          <VolunteerSettingsList onLogout={onLogout} />
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
    </Box>
  );
}

export default VolunteerProfilePage;
