import { mockVolunteerStats } from "../data/mockVolunteerStats.js";

export const emptyVolunteerStats = {
  peopleHelped: 0,
  completedOrders: 0,
  averageRating: 0,
};

/**
 * @typedef {Object} VolunteerStats
 * @property {number} peopleHelped
 * @property {number} completedOrders
 * @property {number} averageRating
 */

export function normalizeVolunteerStats(stats = emptyVolunteerStats) {
  return {
    peopleHelped: Number(stats?.peopleHelped ?? 0),
    completedOrders: Number(stats?.completedOrders ?? 0),
    averageRating: Number(stats?.averageRating ?? 0),
  };
}

export async function fetchVolunteerStats({ volunteerId } = {}) {
  if (!volunteerId) {
    return normalizeVolunteerStats();
  }

  // Futuramente: GET /voluntarios/{volunteerId}/estatisticas.
  return normalizeVolunteerStats(mockVolunteerStats);
}
