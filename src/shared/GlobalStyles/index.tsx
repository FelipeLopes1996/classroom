import { createTheme, GlobalStyles } from '@mui/material';

export const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'roboto, sans-serif',
        },
        h1: {
          fontSize: '2.5rem',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          textTransform: 'none',
          border: '1px solid #ceced3',
          fontSize: '1.4rem',
          padding: '1rem 2rem',
          color: '#232426',
          '&:hover': {
            background: '#ceced3',
          },
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        sx: {
          fontSize: '1.3rem',
        },
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        sx: {
          fontSize: '1.3rem',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontSize: '62.5%',
        },
      },
    },
  },
});

export const globalStyles = (
  <GlobalStyles
    styles={(theme) => ({
      html: {
        height: '100%',
        fontSize: '62.5%',
        miHeight: '100vh',
        boxSizing: 'border-box',
      },
      body: {
        margin: 0,
        backgroundColor: '#FFF',
        fontFamily: theme.typography.fontFamily,
        height: '100%',
        miHeight: '100vh',
      },
    })}
  />
);
