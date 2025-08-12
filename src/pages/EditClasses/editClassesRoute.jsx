import { lazy } from "react";

const EditClasses = lazy(() => import("./EditClasses"));

export const editClassesRoute = {
  element: <EditClasses />,
};
