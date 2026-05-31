import { mockNearbyElderly } from "../data/mockNearbyElderly.js";

export async function getNearbyElderly({ volunteerId, empty = false } = {}) {
  if (!volunteerId || empty) {
    return [];
  }

  // Futuramente: GET /voluntarios/{volunteerId}/idosos-proximos.
  return mockNearbyElderly.filter((elderly) => elderly.needsHelp);
}
