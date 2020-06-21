import React, { FC } from "react";
import { Link, LinkProps } from "react-router-dom";

import Button, { ButtonProps } from "@material-ui/core/Button";

type LinkButtonProps = ButtonProps<"a", LinkProps>;

const LinkButton: FC<LinkButtonProps> = function (props) {
  return (
    <Button component={Link} {...props}>
      {props.children}
    </Button>
  );
};

export default LinkButton;
