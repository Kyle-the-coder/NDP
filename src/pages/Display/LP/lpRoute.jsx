import { lazy } from "react";

const LandingPage = lazy(() => import("./Lp"));

export const landingRoute = {
  element: <LandingPage />,
};
