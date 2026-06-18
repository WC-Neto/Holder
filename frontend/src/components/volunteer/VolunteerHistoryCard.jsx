import React from "react";
import BaseOrderCard from "../shared/BaseOrderCard";

function VolunteerHistoryCard({ historyItem, onViewDetails }) {
  return (
    <BaseOrderCard
      title={historyItem.title}
      categoryType={historyItem.category}
      description={historyItem.description}
      descriptionClampLines={2}
      dateOrTimeAgo={historyItem.date}
      personName={historyItem.elderName}
      personRole="elderly"
      neighborhood={historyItem.neighborhood}
      statusLabel={historyItem.statusLabel}
      statusTheme={historyItem.status}
      actionLayoutType="clickableArea"
      onClickCard={() => onViewDetails?.(historyItem)}
    />
  );
}

export default VolunteerHistoryCard;
