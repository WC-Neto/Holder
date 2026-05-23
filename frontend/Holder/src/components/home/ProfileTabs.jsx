import React, { useState } from "react";
import { Box, Button } from "@mui/material";

const profiles = [
  { value: "idoso", label: "Sou Idoso" },
  { value: "voluntario", label: "Sou Voluntario" },
];

function ProfileTabs() {
  const [selectedProfile, setSelectedProfile] = useState("idoso");

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        bgcolor: "#f3f3f5",
        borderRadius: 3,
        p: 0.3,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 3,
          left: selectedProfile === "idoso" ? 3 : "calc(50% + 1px)",
          width: "calc(50% - 4px)",
          height: "calc(100% - 6px)",
          bgcolor: "#fff",
          borderRadius: 2,
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.18)",
          transition: "left 180ms ease",
          zIndex: 0,
        }}
      />

      {profiles.map((profile) => {
        const isSelected = selectedProfile === profile.value;

        return (
          <Button
            key={profile.value}
            onClick={() => setSelectedProfile(profile.value)}
            sx={{
              position: "relative",
              zIndex: 1,
              height: 40,
              color: isSelected ? "#8ab9b6" : "#9aa2b2",
              borderRadius: 2,
              fontSize: 13,
              fontWeight: 700,
              textTransform: "none",
              "&:hover": {
                bgcolor: "transparent",
              },
            }}
          >
            {profile.label}
          </Button>
        );
      })}
    </Box>
  );
}

export default ProfileTabs;
