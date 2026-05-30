import React from "react";
import { Box, Button, Card, Chip, Stack, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PlumbingOutlinedIcon from "@mui/icons-material/PlumbingOutlined";

const categoryIcons = {
  shopping: LocalGroceryStoreOutlinedIcon,
  repairs: PlumbingOutlinedIcon,
  company: PeopleAltOutlinedIcon,
};

const urgencyStyles = {
  high: { bgcolor: "#fde4e6", color: "#ef3f4d" },
  medium: { bgcolor: "#fff4de", color: "#c98218" },
  low: { bgcolor: "#dcfbef", color: "#00a76f" },
};

function AvailableOrderCard({ order, onViewMore, onHelpNow }) {
  const CategoryIcon = categoryIcons[order.category] ?? BoltOutlinedIcon;
  const urgencySx = urgencyStyles[order.urgencyTone] ?? urgencyStyles.low;

  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        p: 2.4,
        bgcolor: "#fff",
        borderColor: "#eceef2",
        borderRadius: 3,
        boxShadow: "0 1px 2px rgba(37, 48, 68, 0.03)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 2 }}>
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: 3,
            display: "grid",
            placeItems: "center",
            bgcolor: "#eef7f8",
            color: "#96C0BE",
            flexShrink: 0,
          }}
        >
          <CategoryIcon sx={{ fontSize: 23 }} />
        </Box>

        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 1.5,
              mb: 2,
            }}
          >
            <Typography
              component="h2"
              sx={{
                color: "#20283a",
                fontSize: 18,
                fontWeight: 800,
                lineHeight: 1.25,
              }}
            >
              {order.title}
            </Typography>
            <Chip
              label={order.urgencyLevel}
              size="small"
              sx={{
                ...urgencySx,
                height: 32,
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 800,
              }}
            />
          </Box>

          <Typography
            sx={{
              color: "#98a1b0",
              fontSize: 14,
              lineHeight: 1.45,
              mb: 1.8,
            }}
          >
            {order.description}
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            useFlexGap
            sx={{ flexWrap: "wrap", mb: 2.4 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <LocationOnOutlinedIcon sx={{ fontSize: 16, color: "#9aa5b5" }} />
              <Typography sx={{ color: "#8f99aa", fontSize: 13 }}>
                {order.distance} • {order.neighborhood}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <AccessTimeIcon sx={{ fontSize: 16, color: "#9aa5b5" }} />
              <Typography sx={{ color: "#8f99aa", fontSize: 13 }}>
                {order.timeAgo}
              </Typography>
            </Box>
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.4}>
            <Button
              variant="outlined"
              onClick={() => onViewMore?.(order.id)}
              sx={{
                minHeight: 46,
                px: 3,
                borderRadius: 2,
                borderColor: "#edf0f4",
                color: "#3e4654",
                fontWeight: 800,
                textTransform: "none",
                boxShadow: "none",
                "&:hover": {
                  borderColor: "#dfe4eb",
                  bgcolor: "#f8f9fb",
                },
              }}
            >
              Ver mais
            </Button>
            <Button
              variant="contained"
              onClick={() => onHelpNow?.(order.id)}
              sx={{
                flex: 1,
                minHeight: 46,
                borderRadius: 2,
                bgcolor: "#e4a0aa",
                background: "linear-gradient(90deg, #dfa0aa 0%, #f0b4a3 100%)",
                color: "#fff",
                fontWeight: 800,
                textTransform: "none",
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "none",
                  bgcolor: "#dfa0aa",
                },
              }}
            >
              Ajudar agora
            </Button>
          </Stack>
        </Box>
      </Box>
    </Card>
  );
}

export default AvailableOrderCard;
