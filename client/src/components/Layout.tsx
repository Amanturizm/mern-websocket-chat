import React, { PropsWithChildren } from 'react';
import { Box, ThemeProvider } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hook';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import YouTubeIcon from '@mui/icons-material/YouTube';
import AppToolbar from './AppToolbar';
import theme from '../theme';

const iconStyles = {
  width: 35,
  height: 35,
  cursor: 'pointer',
  ':hover': {
    fill: '#ccc',
  },
};

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAppSelector((state) => state.users);
  const isAuthenticated = !!user;

  return (
    <ThemeProvider theme={theme}>
      <header>
        <AppToolbar />
      </header>

      <main style={{ marginTop: 65 }}>
        {children}
      </main>
    </ThemeProvider>
  );
};

export default Layout;
