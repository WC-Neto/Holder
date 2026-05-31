import React from "react";
import { Avatar, Box, Card, IconButton, Stack, Typography } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";

export const nearbyElderlyShape = {
  id: "number",
  photoUrl: "string",
  name: "string",
  distance: "string",
};

function NearbyElderlyCard({
  elderly,
  isSelected = false,
  isInterested = false,
  onContact,
  onToggleInterest,
  onClick,
}) {
  const { photoUrl, name, distance } = elderly;

  const handleCardClick = () => {
    onClick?.(elderly);
  };

  return (
    <Card
      variant="outlined"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleCardClick();
        }
      }}
      sx={{
        minHeight: 82,
        px: 2,
        py: 1.6,
        bgcolor: "#fff",
        borderColor: isSelected ? "#96C0BE" : "#eceef2",
        borderRadius: 3,
        boxShadow: isSelected
          ? "0 0 0 3px rgba(150, 192, 190, 0.18)"
          : "0 1px 2px rgba(37, 48, 68, 0.03)",
        cursor: "pointer",
        transition: "border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease",
        "&:hover": {
          borderColor: "#dbe9e8",
          boxShadow: "0 8px 24px rgba(37, 48, 68, 0.08)",
          transform: "translateY(-1px)",
        },
        "&:focus-within": {
          borderColor: "#96C0BE",
          boxShadow: "0 0 0 3px rgba(150, 192, 190, 0.22)",
        },
        "&:focus": {
          outline: "none",
        },
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
      >
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

        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignSelf: { xs: "stretch", sm: "center" },
            justifyContent: { xs: "flex-end", sm: "flex-start" },
          }}
        >
          <IconButton
            aria-label={`Entrar em contato com ${name}`}
            onClick={(event) => {
              event.stopPropagation();
              onContact?.(elderly);
            }}
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
            onClick={(event) => {
              event.stopPropagation();
              onToggleInterest?.(elderly);
            }}
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

export default NearbyElderlyCard;
