import React, { FC } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

import Button, { ButtonProps } from "@material-ui/core/Button";

type NavLinkButtonProps = ButtonProps<"a", NavLinkProps>;

const NavLinkButton: FC<NavLinkButtonProps> = function (props) {
  return (
    <Button component={NavLink} {...props}>
      {props.children}
    </Button>
  );
};

export default NavLinkButton;
