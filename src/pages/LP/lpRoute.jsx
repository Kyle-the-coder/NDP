import { lazy } from "react";

const LandingPage = lazy(() => import("./Landing"));

export const landingRoute = {
  element: <LandingPage />,
};
