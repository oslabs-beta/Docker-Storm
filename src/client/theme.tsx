import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true; // removes the `xs` breakpoint
    sm: true;
    md: true;
    lg: true;
    xl: true;
    desktopfullhd: true;
    desktop2k: true;
    desktop4k: true;
  }
}

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#4C82FE',
      dark: '#121212',
      contrastText: '#959595',
    },
    secondary: {
      main: '#EF8354',
      light: '#f29b76',
      dark: '#e95818',
      contrastText: '#2D3142',
    },
  },
  spacing: 4,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      desktopfullhd: 1920,
      desktop2k: 2560,
      desktop4k: 3840,
    },
  },
  typography: {
    // fontFamily: RobotoBold,
  },
  
});

export default theme;
