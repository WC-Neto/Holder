import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export const availabilityOptions = ["Manhã", "Tarde", "Noite"];

function getPhoneDigits(phone = "") {
  return phone.replace(/\D/g, "");
}

function clampPercent(value) {
  return Math.max(0, Math.min(100, value));
}

export function formatPhoneNumber(phone = "") {
  const digits = getPhoneDigits(phone).slice(0, 11);

  if (!digits) {
    return "";
  }

  if (digits.length <= 2) {
    return `(${digits}`;
  }

  const areaCode = digits.slice(0, 2);
  const phoneBody = digits.slice(2);
  const prefixLength = digits.length > 10 ? 5 : 4;
  const prefix = phoneBody.slice(0, prefixLength);
  const suffix = phoneBody.slice(prefixLength);

  if (!suffix) {
    return `(${areaCode}) ${prefix}`;
  }

  return `(${areaCode}) ${prefix}-${suffix}`;
}

export function validateProfileForm(formData) {
  const errors = {};

  if (!formData.name.trim() || formData.name.trim().length < 2) {
    errors.name = "Informe um nome com pelo menos 2 caracteres.";
  }

  const phoneDigits = getPhoneDigits(formData.phone);

  if (phoneDigits.length < 10 || phoneDigits.length > 11) {
    errors.phone = "Informe um telefone válido com DDD.";
  }

  if (!formData.availability || formData.availability.length === 0) {
    errors.availability = "Selecione pelo menos um período.";
  }

  return errors;
}

function EditVolunteerProfileForm({ profile, isSaving = false, onCancel, onSave }) {
  const [formData, setFormData] = useState({
    avatarUrl: "",
    avatarPosition: { x: 50, y: 50 },
    name: "",
    phone: "",
    address: "",
    availability: [],
  });
  const [imagePreview, setImagePreview] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [availabilityError, setAvailabilityError] = useState("");
  const previewRef = useRef(null);
  const [dragState, setDragState] = useState(null);
  const objectPosition = `${formData.avatarPosition.x}% ${formData.avatarPosition.y}%`;

  useEffect(() => {
    if (!profile) {
      return;
    }

    const initialAvatarUrl = profile.avatarUrl ?? "";

    setFormData({
      avatarUrl: initialAvatarUrl,
      avatarPosition: profile.avatarPosition ?? { x: 50, y: 50 },
      name: profile.name ?? "",
      phone: formatPhoneNumber(profile.personalInfo?.phone ?? ""),
      address: profile.personalInfo?.address ?? "",
      availability: profile.availability ?? [],
    });
    setImagePreview(initialAvatarUrl);
    setNameError("");
    setPhoneError("");
    setAvailabilityError("");
  }, [profile]);

  const handleInputChange = (field) => (event) => {
    setFormData((currentData) => ({
      ...currentData,
      [field]: event.target.value,
    }));
  };

  const handlePhoneChange = (event) => {
    setFormData((currentData) => ({
      ...currentData,
      phone: formatPhoneNumber(event.target.value),
    }));
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setImagePreview(imageUrl);
    setFormData((currentData) => ({
      ...currentData,
      avatarUrl: imageUrl,
      avatarFileName: file.name,
      avatarPosition: { x: 50, y: 50 },
    }));
  };

  const handleAvatarDragStart = (event) => {
    if (!imagePreview || !previewRef.current) {
      return;
    }

    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    const previewRect = previewRef.current.getBoundingClientRect();

    setDragState({
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      width: previewRect.width,
      height: previewRect.height,
      initialPosition: formData.avatarPosition,
    });
  };

  const handleAvatarDragMove = (event) => {
    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = ((event.clientX - dragState.startX) / dragState.width) * 100;
    const deltaY = ((event.clientY - dragState.startY) / dragState.height) * 100;

    setFormData((currentData) => ({
      ...currentData,
      avatarPosition: {
        x: clampPercent(dragState.initialPosition.x + deltaX),
        y: clampPercent(dragState.initialPosition.y + deltaY),
      },
    }));
  };

  const handleAvatarDragEnd = (event) => {
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    setDragState(null);
  };

  const handleAvailabilityChange = (period) => {
    setFormData((currentData) => {
      const hasPeriod = currentData.availability.includes(period);

      return {
        ...currentData,
        availability: hasPeriod
          ? currentData.availability.filter((item) => item !== period)
          : [...currentData.availability, period],
      };
    });
    setAvailabilityError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateProfileForm(formData);

    setNameError(validationErrors.name ?? "");
    setPhoneError(validationErrors.phone ?? "");
    setAvailabilityError(validationErrors.availability ?? "");

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    onSave?.({
      avatarUrl: formData.avatarUrl,
      avatarPosition: formData.avatarPosition,
      name: formData.name,
      personalInfo: {
        phone: formData.phone,
        address: formData.address,
      },
      availability: formData.availability,
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2.2}>
        <Box>
          <Typography sx={{ color: "#20283a", fontSize: 14, fontWeight: 900, mb: 1 }}>
            Foto
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ alignItems: "center" }}>
            <Box
              ref={previewRef}
              onPointerDown={handleAvatarDragStart}
              onPointerMove={handleAvatarDragMove}
              onPointerUp={handleAvatarDragEnd}
              onPointerCancel={handleAvatarDragEnd}
              sx={{
                width: 116,
                height: 116,
                borderRadius: "50%",
                border: "3px solid #dbe9e8",
                bgcolor: "#eef8f7",
                backgroundImage: imagePreview ? `url(${imagePreview})` : "none",
                backgroundSize: "cover",
                backgroundPosition: objectPosition,
                cursor: imagePreview ? (dragState ? "grabbing" : "grab") : "default",
                flexShrink: 0,
                touchAction: "none",
                userSelect: "none",
              }}
              aria-label="Prévia da foto. Arraste para ajustar o centro da imagem."
              role="img"
            />
            <Stack spacing={1.2} sx={{ width: "100%" }}>
              <Button
                component="label"
                variant="outlined"
                sx={{
                  borderColor: "#dbe9e8",
                  color: "#3e4654",
                  fontWeight: 800,
                  textTransform: "none",
                }}
              >
                Carregar imagem do computador
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handlePhotoChange}
                />
              </Button>
              <Typography sx={{ color: "#98a1b0", fontSize: 12 }}>
                Depois de carregar, arraste a foto na prévia para ajustar o centro.
              </Typography>
            </Stack>
          </Stack>
        </Box>
        <TextField
          label="Nome"
          value={formData.name}
          onChange={handleInputChange("name")}
          fullWidth
          required
          error={Boolean(nameError)}
          helperText={nameError}
          size="small"
        />
        <TextField
          label="Telefone"
          value={formData.phone}
          onChange={handlePhoneChange}
          fullWidth
          error={Boolean(phoneError)}
          helperText={phoneError}
          size="small"
        />
        <TextField
          label="Endereço"
          value={formData.address}
          onChange={handleInputChange("address")}
          fullWidth
          size="small"
        />

        <Box>
          <Typography sx={{ color: "#20283a", fontSize: 14, fontWeight: 900, mb: 0.8 }}>
            Disponibilidade
          </Typography>
          <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
            {availabilityOptions.map((period) => (
              <FormControlLabel
                key={period}
                control={
                  <Checkbox
                    checked={formData.availability.includes(period)}
                    onChange={() => handleAvailabilityChange(period)}
                    sx={{
                      color: "#96C0BE",
                      "&.Mui-checked": { color: "#96C0BE" },
                    }}
                  />
                }
                label={period}
                sx={{ mr: 1 }}
              />
            ))}
          </Stack>
          {availabilityError && (
            <Alert severity="error" variant="outlined" sx={{ mt: 1 }}>
              {availabilityError}
            </Alert>
          )}
        </Box>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2} sx={{ justifyContent: "flex-end" }}>
          <Button
            type="button"
            onClick={onCancel}
            disabled={isSaving}
            sx={{ textTransform: "none" }}
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

export default EditVolunteerProfileForm;
