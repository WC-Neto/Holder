import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

function LogoutConfirmModal({ open, onClose, onConfirm }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="logout-confirm-title"
    >
      <DialogTitle id="logout-confirm-title" sx={{ color: "#20283a", fontWeight: 900 }}>
        Sair da conta?
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: "#667085" }}>
          Sua sessão local será encerrada e você voltará para a tela de login.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} sx={{ textTransform: "none" }}>
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            bgcolor: "#ff4d4f",
            boxShadow: "none",
            fontWeight: 800,
            textTransform: "none",
            "&:hover": {
              bgcolor: "#e04446",
              boxShadow: "none",
            },
          }}
        >
          Sair
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LogoutConfirmModal;
