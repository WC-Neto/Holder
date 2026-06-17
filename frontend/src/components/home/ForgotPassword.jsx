import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

function ForgotPassword({ onBackToLogin }) {
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setEmailSent(true);
  };

  return (
    <Box
      sx={{
        flex: 1,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#fafafa",
        px: 4,
      }}
    >
      <Card
        variant="outlined"
        sx={{
          width: "100%",
          maxWidth: 440,
          p: 4,
          borderRadius: 3,
          borderColor: "#e7e7ea",
          boxShadow: "0 2px 8px rgba(31, 41, 55, 0.08)",
        }}
      >
        <Stack spacing={3}>
          <Box>
            <Typography
              component="h1"
              variant="h4"
              fontWeight="bold"
              sx={{ color: "#20283a", mb: 1 }}
            >
              Recuperar senha
            </Typography>

            <Typography sx={{ color: "#9ba3b3", fontSize: 14 }}>
              Informe seu e-mail para receber as instruções de validação.
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                required
                label="E-mail"
                name="email"
                type="email"
                placeholder="Digite seu e-mail"
                autoComplete="email"
                variant="outlined"
                size="medium"
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{
                  height: 46,
                  borderRadius: 2,
                  color: "#fff",
                  bgcolor: "#e6a0a8",
                  background: "linear-gradient(90deg, #df9aa4 0%, #f0b19b 100%)",
                  fontWeight: 800,
                  textTransform: "none",
                  boxShadow: "none",
                  "&:hover": {
                    bgcolor: "#df9aa4",
                    boxShadow: "none",
                  },
                }}
              >
                Enviar e-mail
              </Button>
            </Stack>
          </Box>

          {emailSent && (
            <Typography
              sx={{
                color: "#5f9f99",
                fontSize: 14,
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              E-mail de validação de senha enviado.
            </Typography>
          )}

          <Link
            component="button"
            type="button"
            underline="hover"
            onClick={onBackToLogin}
            sx={{
              alignSelf: "center",
              color: "#8ab9b6",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            Voltar para o login
          </Link>
        </Stack>
      </Card>
    </Box>
  );
}

export default ForgotPassword;
