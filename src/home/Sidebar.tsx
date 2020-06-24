import React, { FC, useState, useEffect, useMemo } from "react";

import { ArrFindChildren, testData } from "./ArrFindChildren";
import TreeSelection from "./TreeSelection";

interface City {
  value: number | string;
  label: string;
  children: City[];
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
  const [cityList, setList] = useState<City[]>([]);

  const getqi = async () => {
    const value = await fetch("/api/global/city/qu");
    const json = await value.json();
    setList(ArrFindChildren(json.result.rows));
  };

  useEffect(() => {
    (async () => {
      await getqi();
    })();
  }, []);

  return (
    <div>
      <TreeSelection
        onChange={(value) => {
          console.log("data", value);
        }}
        data={cityList}
      />
      <p>2222</p>
      <h1>sads</h1>
      <h1>sads</h1>
      <h1>sads</h1>
      <h1>sads</h1>
      <h1>sads</h1>
      <h1>sads</h1>
    </div>
  );
};

export default Sidebar;
