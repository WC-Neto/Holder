import React from 'react';
import { Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import DashboardShortcutCard from './DashboardShortcutCard';

const ElderlyHomeShortcuts = ({ onNavigate }) => {
  const shortcuts = [
    {
      title: 'Novo Pedido',
      description: 'Compras, consertos ou companhia',
      icon: <AddIcon />,
      iconBgColor: '#e6a0a833',
      iconColor: '#df9aa4',
      pageKey: 'novo-pedido',
    },
    {
      title: 'Meu Histórico',
      description: 'Ver seus pedidos anteriores',
      icon: <AccessTimeIcon />,
      iconBgColor: '#96C0BE33',
      iconColor: '#8ab9b6',
      pageKey: 'historico',
    },
    {
      title: 'Meu Perfil',
      description: 'Dados e contatos de confiança',
      icon: <PeopleOutlinedIcon />,
      iconBgColor: '#f4f4f6',
      iconColor: '#9ba3b3',
      pageKey: 'perfil',
    },
  ];

  return (
    <Grid container spacing={2}>
      {shortcuts.map((shortcut, index) => (
        <Grid item xs={12} md={4} key={index}>
          <DashboardShortcutCard
            title={shortcut.title}
            description={shortcut.description}
            icon={shortcut.icon}
            iconBgColor={shortcut.iconBgColor}
            iconColor={shortcut.iconColor}
            onClick={() => onNavigate(shortcut.pageKey)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ElderlyHomeShortcuts;
