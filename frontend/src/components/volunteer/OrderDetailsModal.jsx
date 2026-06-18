import React from "react";
import BaseOrderModal from "../shared/BaseOrderModal";

function OrderDetailsModal({
  open,
  order,
  isAccepted = false,
  isAcceptBlocked = false,
  onClose,
  onAcceptOrder,
  onFinishOrder,
}) {
  if (!order) return null;

  const elderSummary = order.elderSummary;
  const actionLabel = isAccepted
    ? "Finalizar ajuda"
    : isAcceptBlocked
      ? "Atividade em andamento"
      : "Ajudar agora";

  const personProfile = elderSummary ? {
    role: "elder",
    name: elderSummary.name,
    age: elderSummary.age,
    mobility: elderSummary.mobility,
    notes: elderSummary.notes,
  } : {
    role: "elder",
    name: "",
    fallbackMessage: "Dados do idoso serão exibidos quando permitido.",
  };

  const handlePrimaryAction = () => {
    if (isAccepted) {
      onFinishOrder?.(order);
    } else {
      onAcceptOrder?.(order);
    }
  };

  return (
    <BaseOrderModal
      open={open}
      onClose={onClose}
      title={order.title}
      categoryLabel={order.categoryLabel}
      urgencyLevel={order.urgencyLevel}
      urgencyTone={order.urgencyTone}
      description={order.description}
      locationData={{
        distance: order.distance,
        neighborhood: order.neighborhood,
        timeAgo: order.timeAgo,
      }}
      personProfile={personProfile}
      primaryActionLabel={actionLabel}
      primaryActionDisabled={isAcceptBlocked && !isAccepted}
      primaryActionColorTheme={isAcceptBlocked && !isAccepted ? "disabled" : "default"}
      onPrimaryAction={handlePrimaryAction}
    />
  );
}

export default OrderDetailsModal;
