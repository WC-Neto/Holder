import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ProfileTabs from "./ProfileTabs";
import { createMockUser } from "../../services/mockUserService";

function RegisterUser({ onBackToLogin }) {
  const [selectedProfile, setSelectedProfile] = useState("idoso");
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      const createdUser = createMockUser({
        type: selectedProfile,
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      });

      setFeedback({
        severity: "success",
        message: `Usuário criado com sucesso. ID: ${createdUser.id}`,
      });
      event.currentTarget.reset();
    } catch (error) {
      setFeedback({
        severity: "error",
        message: error?.message ?? "Não foi possível criar o usuário.",
      });
    }
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
              Criar cadastro
            </Typography>

            <Typography sx={{ color: "#9ba3b3", fontSize: 14 }}>
              O cadastro será salvo no mock local do frontend.
            </Typography>
          </Box>

          <ProfileTabs
            selectedProfile={selectedProfile}
            onProfileChange={setSelectedProfile}
          />

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                required
                label="Nome completo"
                name="name"
                placeholder="Digite o nome completo"
                variant="outlined"
                size="medium"
              />

              <TextField
                fullWidth
                required
                label="E-mail"
                name="email"
                type="email"
                placeholder="Digite o e-mail"
                autoComplete="email"
                variant="outlined"
                size="medium"
              />

              <TextField
                fullWidth
                required
                label="Senha"
                name="password"
                type="password"
                placeholder="Digite a senha"
                autoComplete="new-password"
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
                Criar usuário
              </Button>
            </Stack>
          </Box>

          {feedback && (
            <Alert severity={feedback.severity}>{feedback.message}</Alert>
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

export default RegisterUser;
