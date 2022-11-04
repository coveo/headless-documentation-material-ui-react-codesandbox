import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createRoot } from "react-dom/client";

import App from "./App";
import { theme } from "./theme";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);
root.render(
  <CssBaseline>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </CssBaseline>
);
