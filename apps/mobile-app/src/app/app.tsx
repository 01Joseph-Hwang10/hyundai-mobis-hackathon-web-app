import React from 'react';
import Router from './routes';
import { GlobalContextProvider } from './context';
import { ThemeProvider } from '@mui/material';
import { themeOptions } from './theme';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const App: React.FC = () => {
  return (
    <GlobalContextProvider>
      <ThemeProvider theme={themeOptions}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Router />
        </LocalizationProvider>
      </ThemeProvider>
    </GlobalContextProvider>
  );
};

export default App;
