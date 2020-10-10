import red from "@material-ui/core/colors/red";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#f58020"
    },
    secondary: {
      main: "#004990"
    },
    error: {
      main: red.A400
    },
    background: {
      default: "#1e253f"
    }
  }
});

export default theme;
