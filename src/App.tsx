import React, { FC } from "react";
import { useRoutes } from "react-router-dom";

import Box from "@material-ui/core/Box";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import HBox from "./common/HBox";
import NavLinkButton from "./common/NavLinkButton";
import VBox from "./common/VBox";
import pages from "./pages";

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {},
    navLink: {
      "&.active": {
        background: theme.palette.primary.main,
      },
    },
  }),
  { name: "App" },
);

const App: FC = function (props) {
  const classes = useStyles();
  const routes = useRoutes(pages);
  return (
    <VBox height={1}>
      <HBox component="header" p={1} gap={1} boxShadow={1}>
        <Typography variant="subtitle1">GIS UI</Typography>
        <HBox component="nav" gap={0.5} pl={10}>
          {pages.map((route) => (
            <NavLinkButton
              key={route.path}
              to={route.path}
              end={route.path === "/"}
              className={classes.navLink}
            >
              {route.title}
            </NavLinkButton>
          ))}
        </HBox>
      </HBox>
      <Box component="main" flexGrow={1}>
        {routes}
      </Box>
    </VBox>
  );
};

export default App;
