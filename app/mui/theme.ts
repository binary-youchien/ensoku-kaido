import {createTheme} from "@mui/material";


const theme = createTheme({
  palette: {
    primary: {
      main: "#515B92",
    },
    secondary: {
      main: "#566422",
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