import React from "react";
import { Stack, Typography } from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import { useThemeMode } from "../../contexts/ThemeContext";

const personalInfoRows = [
  { key: "phone", icon: PhoneOutlinedIcon },
  { key: "address", icon: LocationOnOutlinedIcon },
  { key: "birthDate", icon: CalendarTodayOutlinedIcon },
];

function PersonalInfoList({ personalInfo = {} }) {
  const { isDarkMode } = useThemeMode();

  return (
    <Stack spacing={1.5}>
      {personalInfoRows.map((row) => {
        const RowIcon = row.icon;
        const value = personalInfo[row.key];

        if (!value) return null;

        return (
          <Stack key={row.key} direction="row" spacing={1.2} sx={{ alignItems: "center" }}>
            <RowIcon sx={{ color: isDarkMode ? "#64748b" : "#98a1b0", fontSize: 20 }} />
            <Typography sx={{ color: isDarkMode ? "#f8fafc" : "#3e4654", fontSize: 14 }}>
              {value}
            </Typography>
          </Stack>
        );
      })}
    </Stack>
  );
}

export default PersonalInfoList;
