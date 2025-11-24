import { lazy } from "react";

const EditClass = lazy(() => import("./EditClass"));

export const editClassRoute = {
  element: <EditClass />,
};
