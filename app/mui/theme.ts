import {amber, grey, lime} from "@mui/material/colors";
import {createTheme} from "@mui/material";


const theme = createTheme({
  palette: {
    primary: {
      main: amber[200],
      contrastText: grey[900],
    },
    secondary: {
      main: lime[800],
    },
    grey: {},
  },
  components: {
    MuiCssBaseline: {},
  },
  typography: {
    // fontFamily: udevFont.style.fontFamily,
    h1: {
      fontSize: "2rem",
    },
    h2: {
      fontSize: "2.5rem",
    },
    h3: {
      fontSize: "2rem",
    },
  },
});

export default theme;