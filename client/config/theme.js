import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#755cde',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#000000',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'hover',
        cursor: 'pointer',
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'filled',
      },
    },
    MuiDatePicker: {
      defaultProps: {
        variant: 'filled',
      },
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    h1: {
      fontWeight: 'bold',
    },
    h2: {
      fontWeight: 'bold',
    },
    h3: {
      fontWeight: 'bold',
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 'bold',
    },
    h6: {
      fontWeight: 'bold',
    },
    button: {
      textTransform: 'none',
    },
  },
});

export default theme;
