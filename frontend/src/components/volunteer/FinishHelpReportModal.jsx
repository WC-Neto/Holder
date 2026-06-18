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
import { useThemeMode } from "../../contexts/ThemeContext";

function FinishHelpReportModal({
  open,
  order,
  isFinishing = false,
  onClose,
  onConfirm,
}) {
  const { isDarkMode } = useThemeMode();
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
    <Dialog
      open={open}
      onClose={isFinishing ? undefined : onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: { bgcolor: isDarkMode ? "#1e293b" : "#fff" },
      }}
    >
      <DialogTitle sx={{ color: isDarkMode ? "#f8fafc" : "#20283a", fontWeight: 900 }}>
        Finalizar ajuda
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ color: isDarkMode ? "#a8b3c7" : "#667085", fontSize: 14, lineHeight: 1.6, mb: 1.5 }}>
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
          sx={{
            "& .MuiOutlinedInput-root": {
              bgcolor: isDarkMode ? "#0f172a" : undefined,
              color: isDarkMode ? "#f8fafc" : undefined,
              "& fieldset": { borderColor: isDarkMode ? "#334155" : undefined },
              "&:hover fieldset": { borderColor: isDarkMode ? "#475569" : undefined },
            },
            "& .MuiInputLabel-root": { color: isDarkMode ? "#64748b" : undefined },
            "& .MuiFormHelperText-root": { color: isDarkMode ? "#64748b" : undefined },
          }}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button
          onClick={onClose}
          disabled={isFinishing}
          sx={{ textTransform: "none", color: isDarkMode ? "#a8b3c7" : undefined }}
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
            "&:hover": { bgcolor: "#87afad", boxShadow: "none" },
          }}
        >
          {isFinishing ? "Finalizando..." : "Finalizar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FinishHelpReportModal;
