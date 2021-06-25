import { createMuiTheme } from "@material-ui/core/styles";
// A custom theme for this app
const theme = createMuiTheme({
  overrides: {
    MuiTextField: {
      root: {
        text: {
          color: "red",
        },
      },
    },
  },
  palette: {
    text: {
      primary: "#282829",
      secondary: "#451C5C",
    },
    type: "dark",
    primary: {
      light: "#00634F",
      main: "#f58020",
      dark: "#2E45BA",
    },
    secondary: {
      light: "#1CEBCF",
      main: "#FFE300",
      dark: "#F05245",
    },
    error: {
      main: "#F05245",
    },
    background: {
      paper: "#00ADFF",
      default: "##FFFFFF",
    },
    action: {
      selected: "#FFE300",
    },
  },
  typography: {
    fontFamily: "Gibson",
  },
});

export default theme;
