import React from "react";
import { Button, Stack } from "@mui/material";

export const volunteerHistoryFilters = [
  { value: "all", label: "Todos" },
  { value: "in_progress", label: "Em Andamento" },
  { value: "completed", label: "Concluídos" },
];

function VolunteerHistoryFilters({ activeFilter = "all", onFilterChange }) {
  return (
    <Stack direction="row" flexWrap="wrap" gap={1}>
      {volunteerHistoryFilters.map((filter) => {
        const isActive = activeFilter === filter.value;

        return (
          <Button
            key={filter.value}
            onClick={() => onFilterChange?.(filter.value)}
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
            {filter.label}
          </Button>
        );
      })}
    </Stack>
  );
}

export default VolunteerHistoryFilters;
