import React from "react";
import { Stack, Typography } from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";

function PersonalInfoList({ personalInfo = {} }) {
  const infoItems = [
    { key: "phone", icon: PhoneOutlinedIcon, value: personalInfo.phone },
    { key: "address", icon: LocationOnOutlinedIcon, value: personalInfo.address },
    { key: "birthDate", icon: CalendarTodayOutlinedIcon, value: personalInfo.birthDate },
  ];

  return (
    <Stack spacing={2} sx={{ mt: 2 }}>
      {infoItems.map((item) => {
        if (!item.value) return null;
        
        const IconComponent = item.icon;
        
        return (
          <Stack key={item.key} direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
            <IconComponent sx={{ color: "#98a1b0", fontSize: 20, strokeWidth: 1.5 }} />
            <Typography sx={{ color: "#3e4654", fontSize: 14 }}>
              {item.value}
            </Typography>
          </Stack>
        );
      })}
    </Stack>
  );
}

export default PersonalInfoList;
