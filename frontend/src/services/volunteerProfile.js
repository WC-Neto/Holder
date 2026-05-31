import { mockVolunteerProfile } from "../data/mockVolunteerProfile.js";

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
