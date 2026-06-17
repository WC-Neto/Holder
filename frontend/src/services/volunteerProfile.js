import { mockVolunteerProfile } from "../data/mockVolunteerProfile.js";
import { getMockUserById, updateMockUser } from "./mockUserService.js";

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

  if (updates.availability !== undefined) {
    validateVolunteerAvailability(updates.availability);
  }
}

function validateVolunteerAvailability(availability = []) {
  if (!Array.isArray(availability) || availability.length === 0) {
    throw new Error("Selecione pelo menos um período");
  }
}

export function buildVolunteerProfileQueryParams({ volunteerId } = {}) {
  const params = {};

  if (volunteerId !== undefined && volunteerId !== null) {
    params.volunteerId = volunteerId;
  }

  return params;
}

function buildVolunteerProfileFromUser(volunteerId) {
  const user = getMockUserById(volunteerId);

  if (!user || user.type !== "voluntario") {
    return null;
  }

  return {
    ...mockVolunteerProfile,
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

export async function getVolunteerProfile({ volunteerId } = {}) {
  if (!volunteerId) {
    return null;
  }

  // Futuramente: GET /voluntarios/{volunteerId}/perfil.
  return buildVolunteerProfileFromUser(volunteerId);
}

export async function updateVolunteerProfile({ volunteerId, updates = {}, shouldFail = false } = {}) {
  if (!volunteerId) {
    throw new Error("Voluntário inválido");
  }

  if (shouldFail) {
    throw new Error("Não foi possível atualizar o perfil");
  }

  validateVolunteerProfileUpdates(updates);
  const currentProfile = buildVolunteerProfileFromUser(volunteerId);

  if (!currentProfile) {
    throw new Error("Perfil nÃ£o encontrado");
  }

  if (updates.name || updates.email) {
    updateMockUser(volunteerId, {
      name: updates.name ?? currentProfile.name,
      email: updates.email ?? currentProfile.email,
    });
  }

  // Futuramente: PATCH /voluntarios/{volunteerId}/perfil com suporte a upload de foto.
  return {
    ...currentProfile,
    ...updates,
    personalInfo: {
      ...currentProfile.personalInfo,
      ...(updates.personalInfo ?? {}),
    },
  };
}

export async function updateVolunteerAvailability({
  volunteerId,
  availability = [],
  shouldFail = false,
} = {}) {
  if (!volunteerId) {
    throw new Error("Voluntário inválido");
  }

  if (shouldFail) {
    throw new Error("Não foi possível atualizar a disponibilidade");
  }

  validateVolunteerAvailability(availability);
  const currentProfile = buildVolunteerProfileFromUser(volunteerId);

  if (!currentProfile) {
    throw new Error("Perfil nÃ£o encontrado");
  }

  // Futuramente: PATCH /voluntarios/{volunteerId}/disponibilidade.
  return {
    ...currentProfile,
    availability,
  };
}
