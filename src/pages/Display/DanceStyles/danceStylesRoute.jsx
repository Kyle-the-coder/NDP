import { lazy } from "react";

const DanceStylesPage = lazy(() => import("./DanceStyles"));

export const danceStylesRoute = {
  element: <DanceStylesPage />,
};
