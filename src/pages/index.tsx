import React from "react";
import { PartialRouteObject } from "react-router";

import AboutPage from "./AboutPage";
import HomePage from "./HomePage";

interface PageRoute extends PartialRouteObject {
  title: string;
  path: string;
}

const routes: PageRoute[] = [
  { title: "Home", path: "/", element: <HomePage /> },
  { title: "About", path: "about", element: <AboutPage /> },
];
export default routes;
