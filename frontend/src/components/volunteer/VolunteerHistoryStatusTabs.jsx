import React from "react";
import { Button, Stack } from "@mui/material";

export const historyStatusOptions = [
  { value: "all", label: "Todos" },
  { value: "in_progress", label: "Em Andamento" },
  { value: "completed", label: "Concluídos" },
];

function VolunteerHistoryStatusTabs({ activeStatus = "all", onStatusChange }) {
  return (
    <Stack direction="row" flexWrap="wrap" gap={1}>
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
              bgcolor: isActive ? "#96C0BE" : "#f6f7f8",
              color: isActive ? "#fff" : "#3e4654",
              fontWeight: 800,
              textTransform: "none",
              boxShadow: "none",
              "&:hover": {
                bgcolor: isActive ? "#87afad" : "#eef0f3",
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
