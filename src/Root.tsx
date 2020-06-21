import { SnackbarProvider } from "notistack";
import React, { FC } from "react";
import { HashRouter } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import App from "./App";
import theme from "./theme";

const Root: FC = function (props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </HashRouter>
    </ThemeProvider>
  );
};

export default Root;
