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
  IconButton,
  Chip
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

import OrderMetaInfo from "../volunteer/OrderMetaInfo";
import UrgencyBadge from "../volunteer/UrgencyBadge";

const getStatusStyles = (theme) => {
  switch (theme) {
    case 'open': return { bgcolor: '#dcfbef', color: '#00a76f' };
    case 'in_progress': return { bgcolor: '#e6efff', color: '#0066cc' };
    case 'completed': return { bgcolor: '#f4f4f6', color: '#9ba3b3' };
    default: return { bgcolor: '#f4f4f6', color: '#9ba3b3' };
  }
};

function DetailRow({ label, value, valueSx }) {
  return (
    <Box>
      <Typography
        sx={{
          color: "#98a1b0",
          fontSize: 12,
          fontWeight: 800,
        }}
      >
        {label}
      </Typography>
      <Typography sx={{ color: "#20283a", fontSize: 15, lineHeight: 1.5, ...valueSx }}>
        {value}
      </Typography>
    </Box>
  );
}

function BaseOrderModal({
  open,
  onClose,
  title,
  categoryLabel,
  description,
  urgencyLevel,
  urgencyTone,
  statusLabel,
  statusTheme = "completed",
  dateOrTimeAgo,
  locationData,
  personProfile,
  completionReport,
  primaryActionLabel,
  primaryActionColorTheme = "default",
  primaryActionDisabled = false,
  onPrimaryAction,
}) {
  const statusStyles = getStatusStyles(statusTheme);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ color: "#20283a", fontWeight: 900, fontSize: 20, pr: 6 }}>
        Detalhes do pedido
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8, color: "text.secondary" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pb: 0 }}>
        <Stack spacing={1.5}>
          {(statusLabel || dateOrTimeAgo) && (
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              {statusLabel && (
                <Chip
                  label={statusLabel}
                  size="small"
                  sx={{
                    ...statusStyles,
                    fontWeight: 800,
                    height: 24,
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    border: "none",
                  }}
                />
              )}
              {dateOrTimeAgo && (
                <Typography variant="body2" sx={{ color: "#9ba3b3", fontWeight: 600 }}>
                  {dateOrTimeAgo}
                </Typography>
              )}
            </Stack>
          )}

          <DetailRow label="Título" value={title} valueSx={{ fontSize: 18, fontWeight: 900, color: "#20283a" }} />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            {categoryLabel && <DetailRow label="Categoria" value={categoryLabel} />}

            {urgencyTone && (
              <Box>
                <Typography
                  sx={{
                    color: "#98a1b0",
                    fontSize: 12,
                    fontWeight: 800,
                  }}
                >
                  Urgência
                </Typography>
                <UrgencyBadge urgencyTone={urgencyTone} label={urgencyLevel} />
              </Box>
            )}
          </Stack>

          <DetailRow label="Descrição Completa" value={description} />

          {locationData && (
            <Box>
              <Typography
                sx={{
                  color: "#98a1b0",
                  fontSize: 12,
                  fontWeight: 800,
                  mb: 0.5,
                }}
              >
                Localização aproximada e Tempo de publicação
              </Typography>
              <OrderMetaInfo
                distance={locationData.distance}
                neighborhood={locationData.neighborhood}
                timeAgo={locationData.timeAgo}
              />
            </Box>
          )}

          {personProfile && (
            <>
              <Box>
                <Typography
                  sx={{
                    color: "#98a1b0",
                    fontSize: 12,
                    fontWeight: 800,
                    mb: 0.5,
                  }}
                >
                  {personProfile.role === "elder" ? "Informações do idoso" : "Voluntário(a)"}
                </Typography>

                {personProfile.name ? (
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                    {personProfile.role === "volunteer" && (
                      <Box sx={{ width: 32, height: 32, borderRadius: "50%", bgcolor: "#f4f4f6", display: "grid", placeItems: "center", color: "#253044" }}>
                        <PersonOutlineOutlinedIcon sx={{ fontSize: 18 }} />
                      </Box>
                    )}
                    <Stack spacing={0.5}>
                      <Typography sx={{ color: "#20283a", fontWeight: 800 }}>
                        {personProfile.name}
                      </Typography>
                      {personProfile.age && personProfile.mobility && (
                        <Typography sx={{ color: "#667085", fontSize: 14 }}>
                          {personProfile.age} anos • {personProfile.mobility}
                        </Typography>
                      )}
                      {personProfile.notes && (
                        <Typography sx={{ color: "#667085", fontSize: 14 }}>
                          {personProfile.notes}
                        </Typography>
                      )}
                    </Stack>
                  </Stack>
                ) : (
                  <Typography sx={{ color: "#667085", fontSize: 14 }}>
                    {personProfile.fallbackMessage || "Dados serão exibidos quando permitido."}
                  </Typography>
                )}
              </Box>
            </>
          )}

          {completionReport && (
            <>
              <Divider sx={{ my: 1.5 }} />
              <Box>
                <Typography
                  sx={{
                    color: "#98a1b0",
                    fontSize: 12,
                    fontWeight: 900,
                    mb: 0.5,
                  }}
                >
                  Relatório da finalização
                </Typography>
                <Typography sx={{ color: "#667085", fontSize: 14, lineHeight: 1.55 }}>
                  {completionReport}
                </Typography>
              </Box>
            </>
          )}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 1.5 }}>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            bgcolor: "#f4f4f6",
            color: "#9ba3b3",
            fontWeight: 700,
            textTransform: "none",
            borderRadius: 2,
            boxShadow: "none",
            "&:hover": {
              bgcolor: "#e7e7ea",
              boxShadow: "none"
            }
          }}
        >
          Fechar
        </Button>
        {primaryActionLabel && (
          <Button
            variant="contained"
            disabled={primaryActionDisabled}
            onClick={onPrimaryAction}
            sx={{
              bgcolor: primaryActionColorTheme === "disabled" || primaryActionDisabled ? "#96C0BE" : "#e4a0aa",
              textTransform: "none",
              fontWeight: 800,
              boxShadow: "none",
              "&.Mui-disabled": {
                color: "#fff",
                bgcolor: "#96C0BE",
              },
            }}
          >
            {primaryActionLabel}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default BaseOrderModal;
