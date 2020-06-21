import React, { FC, useState, useEffect, useMemo } from "react";

import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Collapse,
} from "@material-ui/core";

// @ts-ignore
import { ExpandLess, ExpandMore } from "@material-ui/icons";

interface City {
  id: string;
  name: string;
}

interface Map {
  map: BMap.Map | undefined;
  setSSQ: (arr) => void;
}

interface Bdary {
  boundaries: string[];
}

export const Positioning = (name, map) => {
  const bdary = new BMap.Boundary();
  // 将地址解析结果显示在地图上,并调整地图视野
  bdary.get(name, (rs) => {
    //获取行政区域
    console.log("boundaries", rs);
    map.clearOverlays(); //清除地图覆盖物
    const count = rs.boundaries.length; //行政区域的点有多少个
    for (let i = 0; i < count; i++) {
      const ply = new BMap.Polygon(rs.boundaries[i], {
        strokeWeight: 1,
        strokeColor: "#00ff0f",
        fillColor: "#00ff0f",
        fillOpacity: 0.5,
      }); //建立多边形覆盖物
      map.addOverlay(ply); //添加覆盖物
      map.setViewport(ply.getPath()); //调整视野
    }
  });
};

const Sidebar: FC<Map> = ({ map, setSSQ }) => {
  const [open, setOpen] = React.useState(-1);
  const [shen, shenList] = useState<City[]>([]);
  const [shi, shiList] = useState<City[]>([]);
  const [qu, quList] = useState<City[]>([]);

  const [active, setActive] = useState(["", "", ""]);

  const getShen = async () => {
    const value = await fetch("/api/global/city/shen");
    const json = await value.json();
    shenList(json.result.rows);
  };

  useEffect(() => {
    setSSQ(active);
  }, [active]);

  const getshi = async (code, name) => {
    setActive((state) => {
      const cope = [...state];
      cope[0] = name;
      cope[1] = "";
      cope[2] = "";
      return cope;
    });
    const value = await fetch(
      "/api/global/city/shi?code=" + code.substring(0, 2),
    );
    const json = await value.json();
    setOpen(1);
    shiList(json.result.rows);
    Positioning(name, map);
  };

  const getqi = async (code, name) => {
    setActive((state) => {
      const cope = [...state];
      cope[1] = name;
      cope[2] = "";
      return cope;
    });
    const value = await fetch(
      "/api/global/city/qu?code=" + code.substring(0, 4),
    );
    const json = await value.json();
    setOpen(2);
    quList(json.result.rows);
    Positioning(name, map);
  };

  const selectedQu = (code = "", name) => {
    setActive((state) => {
      const cope = [...state];
      cope[2] = name;
      return cope;
    });
    Positioning(name, map);
  };

  useEffect(() => {
    (async () => {
      await getShen();
    })();
  }, []);

  return (
    <List>
      <ListItem
        button
        onClick={() => setOpen((state) => (state === 0 ? -1 : 0))}
      >
        <ListItemText primary={"省"} />
        {open === 0 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Divider />
      <Collapse in={open === 0} timeout="auto" unmountOnExit>
        <List>
          {shen.map((i) => (
            <ListItem
              button
              onClick={async () => await getshi(i.id.toString(), i.name + "省")}
              key={i.id}
              selected={i.name == active[0]}
            >
              <ListItemText primary={i.name} />
            </ListItem>
          ))}
        </List>
      </Collapse>
      <ListItem
        button
        onClick={() => setOpen((state) => (state === 1 ? -1 : 1))}
      >
        <ListItemText primary={"市"} />
        {open === 1 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open === 1} timeout="auto" unmountOnExit>
        <List>
          {shi.map((i) => (
            <ListItem
              onClick={async () => await getqi(i.id.toString(), i.name)}
              button
              key={i.id}
              selected={i.name == active[1]}
            >
              <ListItemText primary={i.name} />
            </ListItem>
          ))}
        </List>
      </Collapse>
      <Divider />
      <ListItem
        button
        onClick={() => setOpen((state) => (state === 2 ? -1 : 2))}
      >
        <ListItemText primary={"区"} />
        {open === 2 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open === 2} timeout="auto" unmountOnExit>
        <List>
          {qu.map((i) => (
            <ListItem
              button
              onClick={() => selectedQu(i.id.toString(), i.name)}
              key={i.id}
              selected={i.name == active[2]}
            >
              <ListItemText primary={i.name} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </List>
  );
};

export default Sidebar;
