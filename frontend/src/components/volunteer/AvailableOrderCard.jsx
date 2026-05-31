import React from "react";
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PlumbingOutlinedIcon from "@mui/icons-material/PlumbingOutlined";
import OrderMetaInfo from "./OrderMetaInfo";
import UrgencyBadge from "./UrgencyBadge";

export const orderShape = {
  id: "number|string",
  category: "shopping|repairs|company|string",
  title: "string",
  description: "string",
  distance: "string",
  neighborhood: "string",
  timeAgo: "string",
  urgencyLevel: "string",
  urgencyTone: "high|medium|low",
};

const categoryIcons = {
  shopping: LocalGroceryStoreOutlinedIcon,
  repairs: PlumbingOutlinedIcon,
  company: PeopleAltOutlinedIcon,
};

function AvailableOrderCard({
  order,
  isAccepted = false,
  isAccepting = false,
  isFinishing = false,
  isDisabled = false,
  onViewDetails,
  onAcceptOrder,
  onFinishOrder,
  onUnavailableOrder,
}) {
  const CategoryIcon = categoryIcons[order.category] ?? BoltOutlinedIcon;
  const handlePrimaryActionClick = () => {
    if (isAccepted) {
      onFinishOrder?.(order);
      return;
    }

    if (isDisabled) {
      onUnavailableOrder?.(order);
      return;
    }

    onAcceptOrder?.(order);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        p: { xs: 2, sm: 2.4 },
        bgcolor: "#fff",
        borderColor: "#eceef2",
        borderRadius: 3,
        boxShadow: "0 1px 2px rgba(37, 48, 68, 0.03)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 2,
          height: "100%",
        }}
      >
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

        <Box
          sx={{
            minWidth: 0,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
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
            <UrgencyBadge
              urgencyTone={order.urgencyTone}
              label={order.urgencyLevel}
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

          <Box sx={{ mb: 2.4 }}>
            <OrderMetaInfo
              distance={order.distance}
              neighborhood={order.neighborhood}
              timeAgo={order.timeAgo}
            />
          </Box>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.4}
            sx={{ mt: "auto" }}
          >
            <Button
              variant="outlined"
              onClick={() => onViewDetails?.(order)}
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
              disabled={isAccepting || isFinishing}
              onClick={handlePrimaryActionClick}
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
                "&.Mui-disabled": {
                  color: "#fff",
                  bgcolor: "#96C0BE",
                  background: "#96C0BE",
                },
              }}
            >
              {isAccepted
                ? isFinishing
                  ? "Finalizando..."
                  : "Finalizar ajuda"
                : isAccepting
                  ? "Aceitando..."
                  : isDisabled
                    ? "Indisponível"
                    : "Ajudar agora"}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Card>
  );
}

export default AvailableOrderCard;
