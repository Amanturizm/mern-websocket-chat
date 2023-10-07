import React, { PropsWithChildren } from 'react';
import { Typography } from '@mui/material';

const Empty: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Typography
      variant="h3"
      position="absolute"
      top="50%"
      left="50%"
      sx={{ transform: 'translate(-50%)' }}
    >
      {children}
    </Typography>
  );
};

export default Empty;
