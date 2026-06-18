import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import NewOrderForm from '../NewOrderForm';

const ElderlyNewOrderPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" x={{ color: '#20283a' }}>
          Novo Pedido
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Solicite ajuda para o que precisar. Um voluntário próximo entrará em contato.
        </Typography>
      </Box>

      <Paper variant="outlined"
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 3,
          borderColor: '#e7e7ea',
          boxShadow: '0 2px 8px #e7e7ea'
        }}>
        <NewOrderForm />
      </Paper>
    </Container>
  );
};

export default ElderlyNewOrderPage;
