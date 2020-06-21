import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import loadSdk from "./loader";

const BaiduMapContext = createContext<BMap.Map | undefined>(undefined);

export function useBaiduMap(): BMap.Map | undefined {
  return useContext(BaiduMapContext);
}

interface BaiduMapProps {
  center?: string | [number, number];
  zoom?: number;
  styleId?: string;
  apiKey?: string;
  showNavigationControl?: boolean;
  onLoad?: (map: BMap.Map) => void;
}

const BaiduMap: FC<BaiduMapProps> = function (props) {
  const {
    center = "106.027448,33.058202",
    zoom = 5,
    styleId,
    apiKey,
    showNavigationControl,
    onLoad,
  } = props;
  const divRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<BMap.Map>();

  useEffect(() => {
    async function loadMap(): Promise<void> {
      await loadSdk(apiKey);
      if (!divRef.current) {
        return;
      }
      const map = new BMap.Map(divRef.current);

      map.enableScrollWheelZoom();
      map.enableContinuousZoom();
      if (showNavigationControl) {
        map.addControl(
          new BMap.NavigationControl({
            anchor: BMAP_ANCHOR_TOP_RIGHT,
          }),
        );
      }
      let lng: number, lat: number;
      if (typeof center === "string") {
        [lng, lat] = center.split(",").map((x) => +x);
      } else {
        [lng, lat] = center;
      }
      map.centerAndZoom(new BMap.Point(lng, lat), zoom);
      if (styleId) {
        // @ts-ignore
        map.setMapStyleV2({ styleId });
      }
      setMap(map);
      if (onLoad) {
        onLoad(map);
      }
    }
    loadMap().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={divRef}
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      <BaiduMapContext.Provider value={map}>
        {map && props.children}
      </BaiduMapContext.Provider>
    </div>
  );
};

export default BaiduMap;
