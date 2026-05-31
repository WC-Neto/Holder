import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";

function FinishHelpReportModal({
  open,
  order,
  isFinishing = false,
  onClose,
  onConfirm,
}) {
  const [reportText, setReportText] = useState("");
  const [reportError, setReportError] = useState("");

  useEffect(() => {
    if (open) {
      setReportText("");
      setReportError("");
    }
  }, [open, order?.id]);

  const handleConfirm = () => {
    const trimmedReport = reportText.trim();

    if (!trimmedReport) {
      setReportError("Relatório obrigatório.");
      return;
    }

    onConfirm?.(trimmedReport);
  };

  return (
    <Dialog open={open} onClose={isFinishing ? undefined : onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ color: "#20283a", fontWeight: 900 }}>
        Finalizar ajuda
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ color: "#667085", fontSize: 14, lineHeight: 1.6, mb: 1.5 }}>
          Relatório breve{order ? ` para "${order.title}"` : ""}.
        </Typography>
        <TextField
          label="Descreva como a ajuda foi finalizada"
          value={reportText}
          onChange={(event) => {
            setReportText(event.target.value);
            setReportError("");
          }}
          error={Boolean(reportError)}
          helperText={reportError || "Ex.: compra entregue, reparo concluído, idoso avisado."}
          multiline
          minRows={4}
          fullWidth
          disabled={isFinishing}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button
          onClick={onClose}
          disabled={isFinishing}
          sx={{ textTransform: "none" }}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={handleConfirm}
          disabled={isFinishing}
          sx={{
            bgcolor: "#96C0BE",
            textTransform: "none",
            fontWeight: 800,
            boxShadow: "none",
            "&:hover": {
              bgcolor: "#87afad",
              boxShadow: "none",
            },
          }}
        >
          {isFinishing ? "Finalizando..." : "Finalizar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FinishHelpReportModal;
