import React from 'react';
import { Container, Typography, Box, Grid, Stack } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ElderlyHomeShortcuts from '../ElderlyHomeShortcuts';
import CommunityCard from '../../shared/CommunityCard';
import StatsCard from '../../shared/StatsCard';

const ElderlyHomePage = ({ onNavigate }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const mockStats = [
    { label: "Pedidos realizados", value: 3, color: "#253044" },
    { label: "Pedidos concluídos", value: 1, color: "#8ab9b6" },
    { label: "Em andamento", value: 1, color: "#8ab9b6" },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <Grid container spacing={4}>
        <Grid xs={12} lg={8}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h4"
              component="h1"
              fontWeight={800}
              sx={{ color: '#253044', mb: 1 }}
            >
              {getGreeting()}, Sr. José!
            </Typography>
            <Typography variant="body1" sx={{ color: '#9ba3b3' }}>
              O que você gostaria de fazer hoje? Selecione um dos atalhos abaixo.
            </Typography>
          </Box>

          <ElderlyHomeShortcuts onNavigate={onNavigate} />
        </Grid>

        <Grid xs={12} lg={4}>
          <Stack spacing={3}>
            <CommunityCard
              title="Comunidade Ativa"
              subtitle="Mais de 4 voluntários por perto hoje!"
              buttonText="Ver Voluntários"
              buttonColor="#96C0BE"
              icon={<FavoriteBorderIcon sx={{ fontSize: 58, color: '#d99da8' }} />}
              iconBgColor="#f7e9eb"
              onButtonClick={() => { }}
            />

            <StatsCard
              title="Resumo de Pedidos"
              stats={mockStats}
            />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ElderlyHomePage;
