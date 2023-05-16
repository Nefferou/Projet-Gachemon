import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#d32f2f",
    },
    secondary: {
      main: 'rgba(0, 0, 0, 0.01)',
    },
    info: {
      main: '#000000',
      light: '#000000',
      dark: '#000000',
    }
  },
});

export default theme;