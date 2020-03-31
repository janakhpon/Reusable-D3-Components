import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2f3542',
    },
    secondary: {
      main: '#00171f',
    },
    text: {
      primary: "#000",
      secondary: "#2f3542"
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#2f3542',
    },
  },

});


export default theme;
