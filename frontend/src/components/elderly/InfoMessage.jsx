import React from 'react';
import { Alert, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const InfoMessage = ({ message }) => {
  return (
    <Alert 
      icon={<InfoIcon sx={{ color: '#df9aa4' }} />} 
      sx={{ 
        mb: 3, 
        borderRadius: 3, 
        bgcolor: '#fdf5f6', 
        color: '#20283a', 
        border: '1px solid #f9e1e4',
        '& .MuiAlert-icon': {
          alignItems: 'center'
        }
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 500 }}>{message}</Typography>
    </Alert>
  );
};

export default InfoMessage;
