import React from "react";
import VolunteerHistoryStatusTabs, {
  historyStatusOptions,
} from "./VolunteerHistoryStatusTabs";

export const volunteerHistoryFilters = [
  { value: "all", label: "Todos" },
  { value: "in_progress", label: "Em Andamento" },
  { value: "completed", label: "Concluídos" },
];

function VolunteerHistoryFilters({ activeFilter = "all", onFilterChange }) {
  return (
    <VolunteerHistoryStatusTabs
      activeStatus={activeFilter}
      onStatusChange={onFilterChange}
    />
  );
}

export { historyStatusOptions };
export default VolunteerHistoryFilters;
