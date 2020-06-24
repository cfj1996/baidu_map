import React, { FC, useState, useEffect, useMemo } from "react";
import { Box, List, ListItem, ListItemText } from "@material-ui/core";
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
    <List
      style={{
        height: "400px",
        width: "140px",
        display: "inline-block",
        overflow: "auto",
        borderRight: "1px #330 solid",
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
  );
};

export default children;
