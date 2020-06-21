function loadScript(url: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;
    script.onload = function () {
      resolve();
    };
    script.onerror = function () {
      reject();
    };
    document.getElementsByTagName("head")[0].appendChild(script);
  });
}

async function loadAPI(apiKey: string): Promise<void> {
  if (globalThis.BMap) {
    return;
  }
  const url = `http://api.map.baidu.com/api?v=3.0&ak=${apiKey}&callback=BMapCallback`;
  return new Promise((resolve, reject) => {
    globalThis.BMapCallback = () => {
      delete window["BMapCallback"];
      resolve();
    };
    loadScript(url).catch(() => {
      delete window["BMapCallback"];
      reject();
    });
  });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function loadLibraries(): Promise<void> {
  const urlPrefix = `http://api.map.baidu.com/library/`;
  await loadScript(urlPrefix + "RectangleZoom/1.2/src/RectangleZoom_min.js");
  await loadScript(
    urlPrefix + "AreaRestriction/1.2/src/AreaRestriction_min.js",
  );
  await loadScript(urlPrefix + "EventWrapper/1.2/src/EventWrapper.js");
}

export default async function loadSdk(
  apiKey = "Guu1AtY5mGOzC2AulFic3p0H",
): Promise<void> {
  if (globalThis.BMap) {
    return;
  }
  await loadAPI(apiKey);
}
