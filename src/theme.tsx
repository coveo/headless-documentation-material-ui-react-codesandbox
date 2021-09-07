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
    type: "light",
    text: {
      // You can easily change the overall text color
      // primary: '#282829',
      // secondary: '#E5E8E8',
    },
    primary: {
      main: "#2e45ba",
    },
    secondary: {
      main: "#004990",
    },
    error: {
      main: "#F05205",
    },
    background: {
      default: "#fff",
    },
  },
  typography: {
    fontFamily: "Gibson",
    // Material-UI uses rem units for the font size. This will change the base size for the entire search page
    // More info at https://material-ui.com/customization/typography/#font-size
    fontSize: 17,
  },
});

export default theme;
