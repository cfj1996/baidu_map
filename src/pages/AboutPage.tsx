import * as d3 from "d3";
import React, { FC, useEffect } from "react";
const colorScale = d3.scaleOrdinal(d3.schemeAccent);

const parent = [];
const svgWidth = 1000;
const svgHeight = 1000;
const padding = 40;
/**
 * 地理坐标转换为桌面坐标
 * @param geoJson
 */
const geoToScreenCoordinate = (geoJson) => {
  const x0 = padding;
  const y0 = padding;
  const x1 = svgWidth - padding * 2;
  const y1 = svgHeight - padding * 2;
  return d3.geoMercator().fitExtent(
    [
      [x0, y0],
      [x1, y1],
    ],
    geoJson,
  );
};

/**
 * 请求地理坐标数据
 * @param code
 */
const getData = async (code) => {
  const response = await fetch("/api/assets/map/full/" + code + "_full.json");
  return await response.json();
};

const renderMap = (geoJson) => {
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
          svg.selectAll("*").remove();
          renderMap(geoJson);
        }
      }
    });

  const pathGenerator = d3.geoPath().projection(geoToScreenCoordinate(geoJson));
  const G = svg
    .selectAll("path")
    .data(geoJson.features) //数据绑定
    .enter()
    .append("g")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", "1")
    .on("click", async function (data, mg) {
      const e = d3.event;
      getData(data.properties.adcode)
        .then((geoJson) => {
          if (geoJson.type) {
            parent.push(data.properties.parent.adcode);
            svg.selectAll("*").remove();
            renderMap(geoJson);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      e.stopPropagation();
    });
  G.append("path")
    .attr("d", pathGenerator) //绘制path
    .attr("stroke-dasharray", "2,5")
    .attr("fill", (d, i) => {
      return colorScale(i);
    });
  renderText(G, geoJson);
};

const renderText = (G, geoJson) => {
  G.append("text")
    .attr("x", function (d, i) {
      const projection = geoToScreenCoordinate(geoJson);
      const data = d.properties.centroid || d.properties.center;
      if (data) {
        return projection(data)[0] - 15;
      }
    })
    .attr("y", function (d, i) {
      const projection = geoToScreenCoordinate(geoJson);
      const data = d.properties.centroid || d.properties.center;
      if (data) {
        return projection(data)[1] - 5;
      }
    })
    .text(function (d, i) {
      return d.properties.name;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "12px")
    .style("z-index", "9999");
};

const AboutPage: FC = function (props) {
  useEffect(() => {
    getData(100000).then((res) => {
      renderMap(res);
    });
  }, []);

  return (
    <div>
      <svg className="chart" />
      <div className="dom" />
    </div>
  );
};

export default AboutPage;
