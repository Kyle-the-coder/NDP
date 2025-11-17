import { lazy } from "react";

const CreateStylePage = lazy(() => import("./CreateStyle"));

export const EditStylesRoute = {
  element: <CreateStylePage />,
};
