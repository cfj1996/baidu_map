import * as d3 from "d3";
import { schemeSet1 } from "d3-scale-chromatic";
import React, { FC, useEffect } from "react";

import { scaleOrdinal } from "@vx/scale";

const parent = [];
const svgWidth = 1200;
const svgHeight = 900;
const padding = 60;
const colorScale = scaleOrdinal({
  range: schemeSet1,
});

const getData = async (code) => {
  const response = await fetch("/api/assets/map/full/" + code + "_full.json");
  return await response.json();
};

const render = (geoJson) => {
  const x0 = padding;
  const y0 = padding;
  const x1 = svgWidth - padding * 2;
  const y1 = svgHeight - padding * 2;
  const svg = d3
    .select(".chart")
    .attr("height", svgHeight)
    .attr("width", svgWidth)
    .on("click", async function () {
      const event = d3.event;
      if (event.target.localName === "svg") {
        const code = parent.pop();
        if (code) {
          const geoJson = await getData(code);
          svg.selectAll("path").remove();
          render(geoJson);
        }
      }
    })
    .append("g")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", "1");
  const pathGenerator = d3.geoPath().projection(
    d3.geoMercator().fitExtent(
      [
        [x0, y0],
        [x1, y1],
      ],
      geoJson,
    ),
  );
  const mapPath = svg
    .selectAll("path")
    .data(geoJson.features) //数据绑定
    .join("path")
    .attr("d", pathGenerator) //绘制path
    .attr("stroke-dasharray", "2,5")
    .on("click", async function (data) {
      getData(data.properties.adcode)
        .then((geoJson) => {
          if (geoJson.type) {
            parent.push(data.properties.parent.adcode);
            svg.selectAll("path").remove();
            render(geoJson);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .attr("fill", (d, i) => {
      return colorScale(i);
    });
  return mapPath;
};

const AboutPage: FC = function (props) {
  useEffect(() => {
    getData(100000).then((res) => {
      render(res);
    });
  }, []);

  return <svg className="chart" />;
};

export default AboutPage;
