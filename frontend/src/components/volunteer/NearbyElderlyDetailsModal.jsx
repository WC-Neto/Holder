import React from "react";
import {
  Avatar,
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
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";

function DetailItem({ label, children }) {
  return (
    <Box>
      <Typography sx={{ color: "#98a1b0", fontSize: 12, fontWeight: 800, mb: 0.5 }}>
        {label}
      </Typography>
      <Typography sx={{ color: "#20283a", fontSize: 15, lineHeight: 1.5 }}>
        {children}
      </Typography>
    </Box>
  );
}

function NearbyElderlyDetailsModal({ open, elderly, onClose, onContact }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {elderly && (
        <>
          <DialogTitle sx={{ color: "#20283a", fontWeight: 900 }}>
            Detalhes do idoso
          </DialogTitle>

          <DialogContent>
            <Stack spacing={2.4}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar
                  src={elderly.photoUrl}
                  alt={elderly.name}
                  sx={{
                    width: 72,
                    height: 72,
                    border: "2px solid #e9b5bd",
                  }}
                />
                <Box>
                  <Typography sx={{ color: "#20283a", fontSize: 20, fontWeight: 900 }}>
                    {elderly.name}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 0.4 }}>
                    <PlaceOutlinedIcon sx={{ color: "#d99da8", fontSize: 17 }} />
                    <Typography sx={{ color: "#98a1b0", fontSize: 14 }}>
                      {elderly.neighborhood}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>

              <Divider />

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2.4}>
                <DetailItem label="Idade">{elderly.age} anos</DetailItem>
                <DetailItem label="Distância aproximada">{elderly.distance}</DetailItem>
                <DetailItem label="Localização">{elderly.neighborhood}</DetailItem>
              </Stack>

              <DetailItem label="Necessidade atual">{elderly.helpSummary}</DetailItem>
            </Stack>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2.5 }}>
            <Button onClick={onClose} sx={{ textTransform: "none" }}>
              Fechar
            </Button>
            <Button
              variant="contained"
              startIcon={<ChatBubbleOutlineIcon />}
              onClick={() => onContact?.(elderly)}
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
              Enviar mensagem
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}

export default NearbyElderlyDetailsModal;
