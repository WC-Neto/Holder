import React from "react";
import {
  CssBaseline,
  Container,
  Box,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import LoadingScreen from "./components/LoadingScreen";
import { AuthProvider, useAuth } from "./modules/auth/AuthContext";

function AppContent() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return (
      <Container maxWidth="sm">
        <Box mt={10} component={Paper} elevation={3} p={4} textAlign="center">
          <Typography variant="h5" gutterBottom>
            Aguardando pagina de login...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box mt={10} component={Paper} elevation={3} p={4} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Bem-vindo, {user.name || "Usuário"}!
        </Typography>
      </Box>
    </Container>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CssBaseline />
      <AppContent />
    </AuthProvider>
  );
}
