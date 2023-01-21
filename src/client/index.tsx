import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root') as HTMLElement).render(
// we took off strict mode so our components don't run use effect twice
// can easily turn it back on by re wrapping app and it won't really break too much
// take off when you actually care about checking true functionality 
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <App/>
      </CssBaseline>
    </ThemeProvider>
  </QueryClientProvider>

);
