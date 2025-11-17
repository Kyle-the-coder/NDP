import { lazy } from "react";

const CreateClass = lazy(() => import("./CreateClass"));

export const createClassRoute = {
  element: <CreateClass />,
};
