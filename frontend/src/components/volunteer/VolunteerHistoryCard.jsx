import React from "react";
import { Box, Button, Card, IconButton, Stack, Typography } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PlumbingOutlinedIcon from "@mui/icons-material/PlumbingOutlined";

const categoryIcons = {
  shopping: LocalGroceryStoreOutlinedIcon,
  repairs: PlumbingOutlinedIcon,
  company: PeopleAltOutlinedIcon,
};

const statusStyles = {
  in_progress: {
    color: "#96C0BE",
    bg: "#eef8f7",
  },
  completed: {
    color: "#96C0BE",
    bg: "#eef8f3",
  },
};

function VolunteerHistoryCard({ historyItem, onContact, onViewDetails }) {
  const CategoryIcon = categoryIcons[historyItem.category] ?? PeopleAltOutlinedIcon;
  const statusStyle = statusStyles[historyItem.status] ?? statusStyles.completed;

  return (
    <Card
      variant="outlined"
      sx={{
        p: 2,
        bgcolor: "#fff",
        borderColor: "#eceef2",
        borderRadius: 3,
        boxShadow: "0 1px 2px rgba(37, 48, 68, 0.03)",
      }}
    >
      <Stack direction="row" spacing={1.5} sx={{ alignItems: "flex-start" }}>
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: 3,
            display: "grid",
            placeItems: "center",
            bgcolor: "#f3f9fa",
            color: "#9bc7d3",
            flexShrink: 0,
          }}
        >
          <CategoryIcon sx={{ fontSize: 23 }} />
        </Box>

        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Stack direction="row" sx={{ alignItems: "flex-start", justifyContent: "space-between" }}>
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ color: "#20283a", fontSize: 16, fontWeight: 900 }}>
                {historyItem.title}
              </Typography>
              <Typography sx={{ color: "#98a1b0", fontSize: 13 }}>
                {historyItem.date}
              </Typography>
            </Box>

            <IconButton
              aria-label={`Ver detalhes de ${historyItem.title}`}
              onClick={() => onViewDetails?.(historyItem)}
              sx={{ color: "#98a1b0" }}
            >
              <ChevronRightIcon />
            </IconButton>
          </Stack>

          <Stack direction="row" spacing={0.8} sx={{ mt: 1.3, alignItems: "center" }}>
            <Box
              sx={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                bgcolor: "#f4f6f8",
                color: "#98a1b0",
              }}
            >
              <PersonOutlineOutlinedIcon sx={{ fontSize: 16 }} />
            </Box>
            <Typography sx={{ color: "#3e4654", fontSize: 13 }}>
              {historyItem.elderName}
            </Typography>
            <Typography sx={{ color: "#98a1b0", fontSize: 13 }}>
              • {historyItem.neighborhood}
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            sx={{ mt: 2, alignItems: "center", justifyContent: "space-between" }}
          >
            <Box
              sx={{
                px: 1.3,
                py: 0.7,
                borderRadius: 2,
                bgcolor: statusStyle.bg,
                color: statusStyle.color,
                fontSize: 11,
                fontWeight: 900,
              }}
            >
              {historyItem.statusLabel}
            </Box>

            {historyItem.status === "in_progress" && (
              <Button
                size="small"
                startIcon={<ChatBubbleOutlineIcon />}
                onClick={() => onContact?.(historyItem)}
                sx={{
                  borderRadius: 2,
                  bgcolor: "#eef8f7",
                  color: "#96C0BE",
                  fontWeight: 800,
                  textTransform: "none",
                  "&:hover": { bgcolor: "#e3f2f1" },
                }}
              >
                Contato
              </Button>
            )}
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
}

export default VolunteerHistoryCard;
