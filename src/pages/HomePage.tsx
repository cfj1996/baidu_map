import { useSnackbar } from "notistack";
import React, { FC, useState, useEffect } from "react";

import Button from "@material-ui/core/Button";

import { BaiduMap } from "../common/bmap";
import HBox from "../common/HBox";
import VBox from "../common/VBox";
// eslint-disable-next-line import/namespace
import Sidebar, { Positioning } from "../home/Sidebar";

const HomePage: FC = function (props) {
  const { enqueueSnackbar } = useSnackbar();
  const [map, setMap] = useState<BMap.Map>();
  const [btns, setSSQ] = useState(["", "", ""]);

  function onClick(name) {
    Positioning(name, map);
  }

  return (
    <HBox height={1}>
      <VBox width="20rem" height={1} boxShadow={1}>
        <Sidebar
          setSSQ={(arr) => {
            setSSQ(arr);
          }}
          map={map}
        />
      </VBox>
      <VBox height={1} flexGrow="1">
        <HBox p={1} gap={1}>
          {btns.map((i, index) => {
            if (i) {
              return (
                <Button key={index} onClick={() => onClick(i)}>
                  {i}
                </Button>
              );
            } else {
              return null;
            }
          })}
        </HBox>
        <BaiduMap onLoad={setMap} />
      </VBox>
    </HBox>
  );
};

export default HomePage;
