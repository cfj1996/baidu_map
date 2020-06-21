import clsx from "clsx";
import React, { FC } from "react";

import Box, { BoxProps } from "@material-ui/core/Box";
import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles<Theme, HBoxProps>(
  (theme: Theme) => ({
    root: {
      "& > *": {
        marginLeft: (props) => props.gap && `${theme.spacing(props.gap)}px`,
        marginRight: (props) => props.gap && `${theme.spacing(props.gap)}px`,
      },
    },
  }),
  {
    name: "HBox",
  },
);

interface HBoxProps extends BoxProps {
  gap?: number;
}

const HBox: FC<HBoxProps> = function (props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { className, children, gap, ...others } = props;
  const classes = useStyles(props);
  return (
    <Box
      className={clsx(classes.root, className)}
      display="flex"
      flexDirection="row"
      alignItems="center"
      {...others}
    >
      {children}
    </Box>
  );
};

export default HBox;
