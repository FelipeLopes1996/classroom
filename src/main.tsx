import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { globalStyles, theme } from './shared/GlobalStyles/index.tsx';
import { RouterProvider } from 'react-router-dom';
import routers from './routes/index.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {globalStyles}
      <RouterProvider router={routers} />
    </ThemeProvider>
  </React.StrictMode>
);
