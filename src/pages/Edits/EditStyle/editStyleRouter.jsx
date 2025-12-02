import { lazy } from "react";

const EditStyle = lazy(() => import("./EditStyle"));

export const editStyleRoute = {
  element: <EditStyle />,
};
