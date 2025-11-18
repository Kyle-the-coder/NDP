import { lazy } from "react";

const DanceStylesPage = lazy(() => import("./DanceStyle"));

export const danceStyleRoute = {
  element: <DanceStylesPage />,
};
