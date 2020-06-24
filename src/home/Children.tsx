import React, { FC, useState, useEffect, useMemo } from "react";
import { Box, List, ListItem, ListItemText } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
export interface City {
  value: number | string;
  label: string;
  children?: City[];
}

const children: FC<{
  data: City[];
  onPass: (data: City, index: number) => void;
  index: number;
  selectedValue?: number | string;
}> = ({ data, onPass, index, selectedValue }) => {
  return (
    <>
      <List
        style={{
          height: "400px",
          width: "140px",
          display: "inline-block",
          overflow: "auto",
        }}
      >
        {data.map((i) => (
          <ListItem
            selected={i.value === selectedValue}
            button
            key={i.value}
            onClick={() => onPass(i, index)}
          >
            <ListItemText primary={i.label} />
          </ListItem>
        ))}
      </List>
      <Divider style={{ height: "400px" }} orientation="vertical" flexItem />
    </>
  );
};

export default children;
