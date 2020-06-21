import clsx from "clsx";
import React, { FC } from "react";

import Box, { BoxProps } from "@material-ui/core/Box";
import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles<Theme, VBoxProps>(
  (theme: Theme) => ({
    root: {
      "& > *": {
        marginTop: (props) => props.gap && `${theme.spacing(props.gap)}px`,
        marginBottom: (props) => props.gap && `${theme.spacing(props.gap)}px`,
      },
    },
  }),
  {
    name: "VBox",
  },
);

interface VBoxProps extends BoxProps {
  gap?: number;
}

const VBox: FC<VBoxProps> = function (props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { className, children, gap, ...others } = props;
  const classes = useStyles(props);
  return (
    <Box
      className={clsx(className, classes.root)}
      display="flex"
      flexDirection="column"
      {...others}
    >
      {children}
    </Box>
  );
};

export default VBox;
