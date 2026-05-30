import React from "react";
import { Box, Typography } from "@mui/material";
import logo from "../../assets/logo.png";

const stats = [
  { value: "500+", label: "Voluntários" },
  { value: "1.200+", label: "Idosos Ajudados" },
  { value: "3.000+", label: "Pedidos" },
];

function ColumnLeft() {
  return (
    <Box
      sx={{
        width: "40%",
        minHeight: "100vh",
        bgcolor: "#96C0BE",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#f0f0f0",
        textAlign: "center",
        px: 4,
      }}
    >
      <Box
        component="img"
        src={logo}
        alt="Holder"
        sx={{
          width: 150,
          mb: 3,
          filter: "drop-shadow(0 18px 18px rgba(40, 74, 66, 0.22))",
        }}
      />

      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          mb: 2,
          color: "#fff",
        }}
      >
        Conectando Gerações
      </Typography>

      <Typography
        sx={{
          maxWidth: 430,
          color: "rgba(255, 255, 255, 0.92)",
          fontSize: 16,
          lineHeight: 1.6,
        }}
      >
        Uma plataforma que une idosos a voluntários dispostos a ajudar, criando
        laços de solidariedade e cuidado na comunidade.
      </Typography>

      <Box
        sx={{
          mt: 5,
          display: "flex",
          justifyContent: "center",
          gap: 4,
        }}
      >
        {stats.map((item) => (
          <Box key={item.label}>
            <Typography
              sx={{
                color: "#fff",
                fontSize: 28,
                fontWeight: 800,
                lineHeight: 1,
              }}
            >
              {item.value}
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                color: "rgba(255, 255, 255, 0.85)",
                fontSize: 13,
              }}
            >
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default ColumnLeft;
