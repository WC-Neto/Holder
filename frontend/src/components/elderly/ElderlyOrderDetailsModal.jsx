import React from 'react';
import BaseOrderModal from '../shared/BaseOrderModal';

const mapStatusToTheme = (status) => {
  switch (status) {
    case 'Aberto': return 'open';
    case 'Em Progresso': return 'in_progress';
    case 'Concluído': return 'completed';
    default: return 'completed';
  }
};

const ElderlyOrderDetailsModal = ({ open, onClose, order }) => {
  if (!order) return null;

  const personProfile = order.volunteerName ? {
    role: 'volunteer',
    name: order.volunteerName,
  } : null;

  return (
    <BaseOrderModal
      open={open}
      onClose={onClose}
      title={order.title}
      description={order.description}
      statusLabel={order.status}
      statusTheme={mapStatusToTheme(order.status)}
      dateOrTimeAgo={order.date}
      personProfile={personProfile}
    />
  );
};

export default ElderlyOrderDetailsModal;
