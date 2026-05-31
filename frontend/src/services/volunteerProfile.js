import { mockVolunteerProfile } from "../data/mockVolunteerProfile.js";

function getPhoneDigits(phone = "") {
  return phone.replace(/\D/g, "");
}

function validateVolunteerProfileUpdates(updates = {}) {
  if (updates.name !== undefined && updates.name.trim().length < 2) {
    throw new Error("Nome inválido");
  }

  const phone = updates.personalInfo?.phone;

  if (phone !== undefined) {
    const phoneDigits = getPhoneDigits(phone);

    if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      throw new Error("Telefone inválido");
    }
  }
}

export function buildVolunteerProfileQueryParams({ volunteerId } = {}) {
  const params = {};

  if (volunteerId !== undefined && volunteerId !== null) {
    params.volunteerId = volunteerId;
  }

  return params;
}

export async function getVolunteerProfile({ volunteerId } = {}) {
  if (!volunteerId) {
    return null;
  }

  // Futuramente: GET /voluntarios/{volunteerId}/perfil.
  return mockVolunteerProfile;
}

export async function updateVolunteerProfile({ volunteerId, updates = {}, shouldFail = false } = {}) {
  if (!volunteerId) {
    throw new Error("Voluntário inválido");
  }

  if (shouldFail) {
    throw new Error("Não foi possível atualizar o perfil");
  }

  validateVolunteerProfileUpdates(updates);

  // Futuramente: PATCH /voluntarios/{volunteerId}/perfil com suporte a upload de foto.
  return {
    ...mockVolunteerProfile,
    ...updates,
    personalInfo: {
      ...mockVolunteerProfile.personalInfo,
      ...(updates.personalInfo ?? {}),
    },
  };
}
