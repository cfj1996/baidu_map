import { createMuiTheme, Theme } from "@material-ui/core/styles";
import { Overrides } from "@material-ui/core/styles/overrides";

let theme: Theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const overrides: Overrides = {
  MuiButtonBase: {
    root: {
      margin: undefined,
    },
  },
};

theme = createMuiTheme(theme, { overrides });

export default theme;
