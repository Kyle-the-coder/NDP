import { lazy } from "react";

const ClassesPage = lazy(() => import("./Classes"));

export const classesRoute = {
  element: <ClassesPage />,
};
