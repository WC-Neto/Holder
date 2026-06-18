import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import AvailabilityCard from "./AvailabilityCard";

export const availabilityOptions = ["Manhã", "Tarde", "Noite"];

export function validateAvailabilitySelection(selectedAvailability = []) {
  if (selectedAvailability.length === 0) {
    return "Selecione pelo menos um período.";
  }

  return "";
}

function EditAvailabilityForm({
  availability = [],
  isSaving = false,
  onCancel,
  onSave,
}) {
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [availabilityError, setAvailabilityError] = useState("");

  useEffect(() => {
    setSelectedAvailability(availability);
    setAvailabilityError("");
  }, [availability]);

  const handleToggleAvailability = (period) => {
    setSelectedAvailability((currentAvailability) => {
      const hasPeriod = currentAvailability.includes(period);

      return hasPeriod
        ? currentAvailability.filter((item) => item !== period)
        : [...currentAvailability, period];
    });
    setAvailabilityError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationMessage = validateAvailabilitySelection(selectedAvailability);

    setAvailabilityError(validationMessage);

    if (validationMessage) {
      return;
    }

    onSave?.(selectedAvailability);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <Box>
          <Typography sx={{ color: "#20283a", fontSize: 14, fontWeight: 900, mb: 0.5 }}>
            Horários disponíveis
          </Typography>
          <Typography sx={{ color: "#98a1b0", fontSize: 13 }}>
            Selecione um ou mais períodos em que você pode ajudar.
          </Typography>
        </Box>

        <Stack spacing={1}>
          {availabilityOptions.map((period) => (
            <AvailabilityCard
              key={period}
              period={period}
              selected={selectedAvailability.includes(period)}
              onToggle={handleToggleAvailability}
            />
          ))}
        </Stack>

        {availabilityError && (
          <Alert severity="error" variant="outlined">
            {availabilityError}
          </Alert>
        )}

        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2} sx={{ justifyContent: "flex-end" }}>
          <Button
            type="button"
            variant="contained"
            onClick={onCancel}
            disabled={isSaving}
            sx={{
              bgcolor: "#f4f4f6",
              color: "#9ba3b3",
              fontWeight: 700,
              textTransform: "none",
              borderRadius: 2,
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#e7e7ea",
                boxShadow: "none"
              }
            }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSaving}
            sx={{
              bgcolor: "#96C0BE",
              fontWeight: 800,
              textTransform: "none",
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#87afad",
                boxShadow: "none",
              },
            }}
          >
            {isSaving ? "Salvando..." : "Salvar alterações"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default EditAvailabilityForm;
