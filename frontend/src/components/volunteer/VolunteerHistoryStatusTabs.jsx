import React from "react";
import { Button, Stack } from "@mui/material";
import { useThemeMode } from "../../contexts/ThemeContext";

export const historyStatusOptions = [
  { value: "all", label: "Todos" },
  { value: "in_progress", label: "Em Andamento" },
  { value: "completed", label: "Concluídos" },
];

function VolunteerHistoryStatusTabs({ activeStatus = "all", onStatusChange }) {
  const { isDarkMode } = useThemeMode();

  return (
    <Stack
      direction="row"
      sx={{
        flexWrap: "wrap",
        columnGap: 1.5,
        rowGap: 1.5,
      }}>
      {historyStatusOptions.map((statusOption) => {
        const isActive = activeStatus === statusOption.value;

        return (
          <Button
            key={statusOption.value}
            aria-pressed={isActive}
            onClick={() => onStatusChange?.(statusOption.value)}
            sx={{
              minHeight: 38,
              px: 2.2,
              borderRadius: 999,
              bgcolor: isActive ? "#96C0BE" : isDarkMode ? "#1e293b" : "#f6f7f8",
              color: isActive ? "#fff" : isDarkMode ? "#a8b3c7" : "#3e4654",
              fontWeight: 800,
              textTransform: "none",
              boxShadow: "none",
              border: isDarkMode && !isActive ? "1px solid #253044" : "none",
              "&:hover": {
                bgcolor: isActive ? "#87afad" : isDarkMode ? "#253044" : "#eef0f3",
                boxShadow: "none",
              },
            }}
          >
            {statusOption.label}
          </Button>
        );
      })}
    </Stack>
  );
}

export default VolunteerHistoryStatusTabs;
