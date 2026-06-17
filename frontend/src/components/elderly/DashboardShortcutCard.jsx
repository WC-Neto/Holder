import React from 'react';
import { Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';
import { ChevronRightOutlined } from '@mui/icons-material';

const DashboardShortcutCard = ({ title, description, icon, iconBgColor, iconColor, onClick }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: '12px',
        borderColor: '#e7e7ea',
        boxShadow: '0px 4px 14px #1f293714',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          borderColor: '#8ab9b6',
          boxShadow: '0px 6px 20px #1f293720',
        }
      }}
    >
      <CardActionArea onClick={onClick} sx={{ height: '100%' }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
          <Box
            sx={{
              borderRadius: '50%',
              width: 48,
              height: 48,
              bgcolor: iconBgColor,
              color: iconColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            {icon}
          </Box>

          <Box sx={{ flexGrow: 1, ml: 2 }}>
            <Typography
              component="h3"
              sx={{
                color: '#253044',
                fontWeight: 700,
                fontSize: '16px',
                lineHeight: 1.2,
                mb: 0.5
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#9ba3b3',
                fontSize: '13px',
                lineHeight: 1.4
              }}
            >
              {description}
            </Typography>
          </Box>

          <ChevronRightOutlined sx={{ color: '#9ba3b3', ml: 1 }} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default DashboardShortcutCard;
