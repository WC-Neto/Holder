import React from "react";
import { Avatar, Box, Card, IconButton, Stack, Typography } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";

function ElderlyCard({
  elderly,
  isInterested = false,
  onContact,
  onToggleInterest,
}) {
  const { photoUrl, name, distance } = elderly;

  return (
    <Card
      variant="outlined"
      sx={{
        minHeight: 82,
        px: 2,
        py: 1.6,
        bgcolor: "#fff",
        borderColor: "#eceef2",
        borderRadius: 3,
        boxShadow: "0 1px 2px rgba(37, 48, 68, 0.03)",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar
          src={photoUrl}
          alt={name}
          sx={{
            width: 52,
            height: 52,
            border: "2px solid #e9b5bd",
          }}
        />

        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography sx={{ color: "#20283a", fontSize: 16, fontWeight: 900 }}>
            {name}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <PlaceOutlinedIcon sx={{ color: "#d99da8", fontSize: 16 }} />
            <Typography sx={{ color: "#98a1b0", fontSize: 13 }}>
              {distance}
            </Typography>
          </Stack>
        </Box>

        <Stack direction="row" spacing={1}>
          <IconButton
            aria-label={`Entrar em contato com ${name}`}
            onClick={() => onContact?.(elderly)}
            sx={{
              width: 42,
              height: 42,
              bgcolor: "#edf8f7",
              color: "#75b6b3",
              "&:hover": { bgcolor: "#dff1f0" },
            }}
          >
            <ChatBubbleOutlineIcon />
          </IconButton>

          <IconButton
            aria-label={
              isInterested
                ? `Remover interesse em ${name}`
                : `Demonstrar interesse em ${name}`
            }
            onClick={() => onToggleInterest?.(elderly)}
            sx={{
              width: 42,
              height: 42,
              bgcolor: "#fbf0f2",
              color: "#d99da8",
              "&:hover": { bgcolor: "#f7e3e7" },
            }}
          >
            {isInterested ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Stack>
      </Stack>
    </Card>
  );
}

export default ElderlyCard;
