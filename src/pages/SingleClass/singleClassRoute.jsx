import { lazy } from "react";

const SingleClassPage = lazy(() => import("./SingleClass"));

export const singleClassRoute = {
  element: <SingleClassPage />,
};
