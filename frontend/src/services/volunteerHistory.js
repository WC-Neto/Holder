import { mockVolunteerHistory } from "../data/mockVolunteerHistory.js";

const DEFAULT_FILTER = "all";

export async function getVolunteerHistory({ volunteerId, empty = false } = {}) {
  if (!volunteerId || empty) {
    return [];
  }

  // Futuramente: GET /voluntarios/{volunteerId}/historico.
  return mockVolunteerHistory;
}

export function filterVolunteerHistory(historyItems, activeHistoryFilter = DEFAULT_FILTER) {
  if (activeHistoryFilter === DEFAULT_FILTER) {
    return historyItems;
  }

  return historyItems.filter((historyItem) => historyItem.status === activeHistoryFilter);
}

export function getVolunteerHistorySummary(historyItems) {
  return {
    total: historyItems.length,
    completed: historyItems.filter((historyItem) => historyItem.status === "completed").length,
  };
}
