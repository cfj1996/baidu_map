import { useSnackbar } from "notistack";
import React, { FC, useState, useEffect } from "react";

import Button from "@material-ui/core/Button";

import { BaiduMap } from "../common/bmap";
import HBox from "../common/HBox";
import VBox from "../common/VBox";
import Sidebar from "../home/Sidebar";

const HomePage: FC = function (props) {
  const { enqueueSnackbar } = useSnackbar();
  const [map, setMap] = useState<BMap.Map>();

  useEffect(() => {
    if (!map) {
      return;
    }
    console.log("use map here");
    console.log(map);
  }, [map]);

  function onClick() {
    enqueueSnackbar("hello");
  }

  return (
    <HBox height={1}>
      <VBox width="20rem" height={1} boxShadow={1}>
        <Sidebar />
      </VBox>
      <VBox height={1} flexGrow="1">
        <HBox p={1} gap={1}>
          <Button onClick={onClick}>TOOL</Button>
          <Button onClick={onClick}>TOOL</Button>
          <Button onClick={onClick}>TOOL</Button>
        </HBox>
        <BaiduMap onLoad={setMap} />
      </VBox>
    </HBox>
  );
};

export default HomePage;
