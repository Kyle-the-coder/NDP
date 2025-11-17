import { lazy } from "react";

const CreateStylePage = lazy(() => import("./CreateStyle"));

export const createStyleRoute = {
  element: <CreateStylePage />,
};
