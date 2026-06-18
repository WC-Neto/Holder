import React, { useEffect, useMemo, useState } from 'react';
import { Container, Typography, Box, Stack } from '@mui/material';
import ElderlyOrderCard from '../ElderlyOrderCard';
import ElderlyOrderDetailsModal from '../ElderlyOrderDetailsModal';
import ElderlyHistoryStatusTabs from '../ElderlyHistoryStatusTabs';
import EmptyState from '../../volunteer/EmptyState';
import LoadingState from '../../volunteer/LoadingState';
import ErrorState from '../../volunteer/ErrorState';
import { getElderlyHistory, filterElderlyHistory } from '../../../services/elderlyHistory';

const ElderlyHistoryPage = () => {
  const [historyItems, setHistoryItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadHistory = async () => {
    setIsLoading(true);
    setError('');

    try {
      const items = await getElderlyHistory();
      setHistoryItems(items);
    } catch (err) {
      setHistoryItems([]);
      setError(err?.message ?? "Não foi possível carregar o histórico.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);
    setError('');

    getElderlyHistory()
      .then((items) => {
        if (isMounted) {
          setHistoryItems(items);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setHistoryItems([]);
          setError(err?.message ?? "Não foi possível carregar o histórico.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredOrders = useMemo(
    () => filterElderlyHistory(historyItems, activeFilter),
    [activeFilter, historyItems]
  );

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleRetryLoad = () => {
    loadHistory();
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight={800} sx={{ color: '#253044', mb: 1 }}>
          Meu Histórico
        </Typography>
        <Typography variant="body1" sx={{ color: '#9ba3b3', mb: 3 }}>
          Acompanhe todos os seus pedidos de ajuda, ativos e passados.
        </Typography>

        <ElderlyHistoryStatusTabs
          activeStatus={activeFilter}
          onStatusChange={setActiveFilter}
        />
      </Box>

      {isLoading ? (
        <LoadingState
          title="Carregando histórico"
          description="Estamos buscando seus pedidos de ajuda recentes."
        />
      ) : error ? (
        <ErrorState
          title="Não foi possível carregar o histórico"
          description={error}
          onRetry={handleRetryLoad}
        />
      ) : filteredOrders.length > 0 ? (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
            gap: 3
          }}
        >
          {filteredOrders.map(order => (
            <ElderlyOrderCard
              key={order.id}
              title={order.title}
              date={order.date}
              description={order.description}
              status={order.status}
              statusLabel={order.statusLabel}
              volunteerName={order.volunteerName}
              category={order.category}
              onClick={() => handleOpenModal(order)}
            />
          ))}
        </Box>
      ) : (
        <EmptyState
          title="Nenhum pedido encontrado"
          description="Nenhum pedido com o status selecionado."
        />
      )}

      <ElderlyOrderDetailsModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={selectedOrder}
      />
    </Container>
  );
};

export default ElderlyHistoryPage;