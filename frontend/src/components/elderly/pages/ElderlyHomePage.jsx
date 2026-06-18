import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Stack, Button } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import ElderlyHomeShortcuts from '../ElderlyHomeShortcuts';
import CommunityCard from '../../shared/CommunityCard';
import StatsCard from '../../shared/StatsCard';
import ElderlyOrderCard from '../ElderlyOrderCard';
import ElderlyOrderDetailsModal from '../ElderlyOrderDetailsModal';

const ElderlyHomePage = ({ onNavigate }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

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

  const mockActiveOrders = [
    {
      id: 1,
      title: 'Compras de supermercado',
      date: 'Há 2h',
      description: 'Preciso de ajuda para comprar os itens da semana no supermercado central. A lista já está pronta.',
      status: 'Em Progresso',
      volunteerName: 'Ana Santos',
      urgencyTone: 'medium',
      urgencyLevel: 'Média Urgência',
      icon: <ShoppingCartOutlinedIcon />
    },
    {
      id: 2,
      title: 'Consertar torneira',
      date: 'Há 1 dia',
      description: 'A torneira da cozinha está pingando muito. Preciso de alguém com ferramentas básicas para trocar a borrachinha.',
      status: 'Aberto',
      icon: <BuildOutlinedIcon />
    },
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

          <Box sx={{ mt: 5, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight={800} sx={{ color: '#253044' }}>
              Pedidos Ativos
            </Typography>
            <Button
              variant="text"
              sx={{ color: '#8ab9b6', fontWeight: 700, textTransform: 'none' }}
              onClick={() => onNavigate('historico')}
            >
              Ver todos
            </Button>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
              gap: 2
            }}
          >
            {mockActiveOrders.map(order => (
              <ElderlyOrderCard
                key={order.id}
                title={order.title}
                date={order.date}
                description={order.description}
                status={order.status}
                volunteerName={order.volunteerName}
                icon={order.icon}
                onClick={() => handleOpenModal(order)}
                urgencyTone={order.urgencyTone}
                urgencyLevel={order.urgencyLevel}
              />
            ))}
          </Box>
        </Grid>

        <Grid xs={12} lg={4}>
          <Stack spacing={3}>
            <Box
              onClick={() => onNavigate('comunidade')}
              sx={{
                cursor: 'pointer',
                transition: 'opacity 0.2s, transform 0.2s',
                '&:hover': { opacity: 0.95, transform: 'translateY(-2px)' }
              }}
            >
              <CommunityCard
                title="Comunidade Ativa"
                subtitle="Mais de 4 voluntários por perto hoje!"
                buttonText="Ver Voluntários"
                buttonColor="#96C0BE"
                icon={<FavoriteBorderIcon sx={{ fontSize: 58, color: '#d99da8' }} />}
                iconBgColor="#f7e9eb"
                onButtonClick={(e) => {
                  e.stopPropagation();
                  onNavigate('comunidade');
                }}
              />
            </Box>

            <StatsCard
              title="Resumo de Pedidos"
              stats={mockStats}
            />
          </Stack>
        </Grid>
      </Grid>

      <ElderlyOrderDetailsModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={selectedOrder}
      />
    </Container>
  );
};

export default ElderlyHomePage;