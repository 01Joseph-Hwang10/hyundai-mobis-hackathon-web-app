import type {} from '@mui/x-date-pickers/themeAugmentation';

import { createTheme } from '@mui/material/styles';

export const themeOptions = createTheme({
  palette: {
    primary: {
      main: '#3751FF',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#ffffff',
    },
    text: {
      primary: '#000000',
    },
  },
  typography: {
    h1: {
      fontWeight: 700,
      fontSize: '3rem',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.0rem',
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: '1.2rem',
      lineHeight: '1.2rem',
    },
    subtitle2: {
      fontWeight: 400,
      fontSize: '1.0rem',
    },
  },
});

export const extraColors = {
  grey: 'rgb(232, 232, 232)',
};
