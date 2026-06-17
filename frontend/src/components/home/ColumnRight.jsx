import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ProfileTabs from "./ProfileTabs";
import { initialMockUsers } from "../../data/mockUsers";
import {
  authenticateMockUser,
  saveCurrentMockUser,
} from "../../services/mockUserService";

const anaVolunteer = initialMockUsers.find(
  (user) => user.type === "voluntario" && user.name === "Ana Santos",
);

function ColumnRight({ onLogin, onForgotPassword, onRegister }) {
  const [selectedProfile, setSelectedProfile] = useState("idoso");
  const [loginError, setLoginError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const loginData = {
      userType: selectedProfile,
      email,
      password: formData.get("password"),
      remember: formData.get("remember") === "remember",
    };

    const authenticatedUser = authenticateMockUser({
      type: loginData.userType,
      email: loginData.email,
      password: loginData.password,
    });

    if (!authenticatedUser) {
      setLoginError("E-mail ou senha inválidos.");
      return;
    }

    setLoginError("");
    saveCurrentMockUser(authenticatedUser);
    console.log("Dados preparados para login:", {
      ...loginData,
      userId: authenticatedUser.id,
    });

    if (onLogin) {
      onLogin(authenticatedUser);
    }
  };

  const handleGoogleLogin = () => {
    window.alert("Sign in with Google");
  };

  const handleFacebookLogin = () => {
    window.alert("Sign in with Facebook");
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
              Bem-vindo ao Holder
            </Typography>

            <Typography sx={{ color: "#9ba3b3", fontSize: 14 }}>
              Entre para continuar
            </Typography>
          </Box>

          <ProfileTabs
            selectedProfile={selectedProfile}
            onProfileChange={setSelectedProfile}
          />

          <Box component="form" onSubmit={handleSubmit}>
            <input type="hidden" name="userType" value={selectedProfile} />

            <Stack spacing={2}>
              <TextField
                fullWidth
                label="E-mail"
                name="email"
                type="email"
                placeholder={
                  selectedProfile === "voluntario"
                    ? anaVolunteer?.email
                    : "Digite seu e-mail"
                }
                autoComplete="email"
                variant="outlined"
                size="medium"
                error={Boolean(loginError)}
                onChange={() => setLoginError("")}
              />

              <TextField
                fullWidth
                label="Senha"
                name="password"
                type="password"
                placeholder="Digite sua senha"
                autoComplete="current-password"
                variant="outlined"
                size="medium"
                error={Boolean(loginError)}
                helperText={loginError}
                onChange={() => setLoginError("")}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    sx={{
                      color: "#8ab9b6",
                      "&.Mui-checked": {
                        color: "#8ab9b6",
                      },
                    }}
                  />
                }
                label="Lembrar de mim"
                sx={{
                  color: "#253044",
                  "& .MuiFormControlLabel-label": {
                    fontSize: 14,
                    fontWeight: 500,
                  },
                }}
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
                Entrar
              </Button>

              <Link
                component="button"
                type="button"
                underline="hover"
                onClick={onForgotPassword}
                sx={{
                  alignSelf: "center",
                  color: "#8ab9b6",
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                Esqueceu sua senha?
              </Link>
            </Stack>
          </Box>

          <Divider>
            <Typography sx={{ color: "#9ba3b3", fontSize: 13 }}>ou</Typography>
          </Divider>

          <Stack spacing={1.5}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleGoogleLogin}
              sx={{
                height: 40,
                borderRadius: 2,
                borderColor: "#d7dbe3",
                color: "#253044",
                fontWeight: 700,
                textTransform: "none",
              }}
            >
              G&nbsp;&nbsp;Entrar com Google
            </Button>

            <Button
              fullWidth
              variant="outlined"
              onClick={handleFacebookLogin}
              sx={{
                height: 40,
                borderRadius: 2,
                borderColor: "#d7dbe3",
                color: "#253044",
                fontWeight: 700,
                textTransform: "none",
              }}
            >
              f&nbsp;&nbsp;Entrar com Facebook
            </Button>
          </Stack>

          <Typography sx={{ color: "#a3aaba", fontSize: 13, textAlign: "center" }}>
            Primeiro acesso?{" "}
            <Link
              component="button"
              type="button"
              underline="hover"
              onClick={onRegister}
              sx={{ color: "#8ab9b6", fontWeight: 800 }}
            >
              Faça seu cadastro aqui
            </Link>
          </Typography>
        </Stack>
      </Card>
    </Box>
  );
}

export default ColumnRight;
