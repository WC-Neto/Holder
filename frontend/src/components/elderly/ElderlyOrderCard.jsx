import React from 'react';
import BaseOrderCard from '../shared/BaseOrderCard';

const ElderlyOrderCard = ({ title, date, description, status, statusLabel, volunteerName, category, icon, onClick, urgencyTone, urgencyLevel }) => {
  return (
    <BaseOrderCard
      title={title}
      categoryType={category || "other"}
      customIconNode={icon}
      iconColorTheme="neutral"
      description={description}
      descriptionClampLines={2}
      dateOrTimeAgo={date}
      statusLabel={statusLabel || status}
      statusTheme={status}
      personName={volunteerName}
      personRole="volunteer"
      actionLayoutType="clickableArea"
      onClickCard={onClick}
      urgencyTone={urgencyTone}
      urgencyLevel={urgencyLevel}
    />
  );
};

export default ElderlyOrderCard;