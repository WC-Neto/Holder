import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import OrderMetaInfo from "./OrderMetaInfo";
import UrgencyBadge from "./UrgencyBadge";
import { useThemeMode } from "../../contexts/ThemeContext";

function DetailRow({ label, children }) {
  const { isDarkMode } = useThemeMode();

  return (
    <Box>
      <Typography sx={{ color: isDarkMode ? "#64748b" : "#98a1b0", fontSize: 12, fontWeight: 800, mb: 0.6 }}>
        {label}
      </Typography>
      <Typography sx={{ color: isDarkMode ? "#f8fafc" : "#20283a", fontSize: 15, lineHeight: 1.5 }}>
        {children}
      </Typography>
    </Box>
  );
}

function OrderDetailsModal({
  open,
  order,
  isAccepted = false,
  isAcceptBlocked = false,
  onClose,
  onAcceptOrder,
  onFinishOrder,
}) {
  const { isDarkMode } = useThemeMode();
  const elderSummary = order?.elderSummary;
  const actionLabel = isAccepted
    ? "Finalizar ajuda"
    : isAcceptBlocked
      ? "Atividade em andamento"
      : "Ajudar agora";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: { bgcolor: isDarkMode ? "#1e293b" : "#fff" },
      }}
    >
      {order && (
        <>
          <DialogTitle sx={{ color: isDarkMode ? "#f8fafc" : "#20283a", fontWeight: 900 }}>
            Detalhes do pedido
          </DialogTitle>

          <DialogContent>
            <Stack spacing={2.2}>
              <DetailRow label="Título completo">{order.title}</DetailRow>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <DetailRow label="Categoria">{order.categoryLabel}</DetailRow>
                <Box>
                  <Typography sx={{ color: isDarkMode ? "#64748b" : "#98a1b0", fontSize: 12, fontWeight: 800, mb: 0.6 }}>
                    Urgência
                  </Typography>
                  <UrgencyBadge urgencyTone={order.urgencyTone} label={order.urgencyLevel} />
                </Box>
              </Stack>

              <DetailRow label="Descrição">{order.description}</DetailRow>

              <Box>
                <Typography sx={{ color: isDarkMode ? "#64748b" : "#98a1b0", fontSize: 12, fontWeight: 800, mb: 1 }}>
                  Localização aproximada e Tempo de publicação
                </Typography>
                <OrderMetaInfo
                  distance={order.distance}
                  neighborhood={order.neighborhood}
                  timeAgo={order.timeAgo}
                />
              </Box>

              <Divider sx={{ borderColor: isDarkMode ? "#253044" : undefined }} />

              <Box>
                <Typography sx={{ color: isDarkMode ? "#64748b" : "#98a1b0", fontSize: 12, fontWeight: 800, mb: 1 }}>
                  Informações do idoso
                </Typography>

                {elderSummary ? (
                  <Stack spacing={0.7}>
                    <Typography sx={{ color: isDarkMode ? "#f8fafc" : "#20283a", fontWeight: 800 }}>
                      {elderSummary.name}
                    </Typography>
                    <Typography sx={{ color: isDarkMode ? "#a8b3c7" : "#667085", fontSize: 14 }}>
                      {elderSummary.age} anos • {elderSummary.mobility}
                    </Typography>
                    <Typography sx={{ color: isDarkMode ? "#a8b3c7" : "#667085", fontSize: 14 }}>
                      {elderSummary.notes}
                    </Typography>
                  </Stack>
                ) : (
                  <Typography sx={{ color: isDarkMode ? "#a8b3c7" : "#667085", fontSize: 14 }}>
                    Dados do idoso serão exibidos quando permitido.
                  </Typography>
                )}
              </Box>
            </Stack>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2.5 }}>
            <Button
              onClick={onClose}
              sx={{ textTransform: "none", color: isDarkMode ? "#a8b3c7" : undefined }}
            >
              Fechar
            </Button>
            <Button
              variant="contained"
              onClick={() => isAccepted ? onFinishOrder?.(order) : onAcceptOrder?.(order)}
              sx={{
                bgcolor: isAcceptBlocked ? "#96C0BE" : "#e4a0aa",
                textTransform: "none",
                fontWeight: 800,
                boxShadow: "none",
                "&.Mui-disabled": { color: "#fff", bgcolor: "#96C0BE" },
              }}
            >
              {actionLabel}
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}

export default OrderDetailsModal;
