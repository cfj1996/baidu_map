import React, { FC, useState, useEffect, useMemo } from "react";

import Collapse from "@material-ui/core/Collapse";
import TextField from "@material-ui/core/TextField";

import Children, { City } from "./Children";

import "./Tree.css";

const TreeSelection: FC<{
  data: City[];
  onChange: (value: City[]) => void;
}> = ({ data, onChange }) => {
  const [ls, setLs] = useState([data]);
  const [value, change] = useState<City[]>([]);
  const [open, setOpen] = useState(false);

  const pass = (city: City, index: number) => {
    if (city.value === value[index]?.value) return;
    const val = [...value];
    if (index !== value.length - 1) {
      val.splice(index);
    }
    val[index] = { value: city.value, label: city.label };
    change(val);
    onChange(val);

    if (city.children && city.children.length) {
      const stare = [...ls];
      if (index !== ls.length - 1) {
        stare.splice(index + 1);
      }
      stare.push(city.children);
      setLs(stare);
    } else {
      setOpen(false);
    }
  };

  useEffect(() => {
    setLs([data]);
  }, [data]);

  return (
    <div className="container">
      <TextField
        disabled={true}
        id="outlined-basic"
        onClick={() => setOpen(true)}
        label="请选择区域"
        variant="outlined"
        value={value.map((i) => i.label).join(" / ")}
      />
      <Collapse className="collapse" in={open} timeout="auto" unmountOnExit>
        <div style={{ display: "flex" }}>
          {ls.map((i, key) => (
            <Children
              key={key}
              selectedValue={value[key]?.value}
              index={key}
              data={i}
              onPass={pass}
            />
          ))}
        </div>
      </Collapse>
    </div>
  );
};

export default TreeSelection;
