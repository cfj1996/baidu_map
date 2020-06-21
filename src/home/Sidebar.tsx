import React, { FC } from "react";

import { makeStyles, Theme } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      width: "100%",
      height: "100%",
    },
    list: {
      margin: "10%",
      width: "80%",
      height: "80%",
    },
  }),
  { name: "sidebar" },
);

const Sidebar: FC = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <FormControl className={classes.list}>
        <Select value="请输入地址/省" displayEmpty>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem>Ten</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Sidebar;
