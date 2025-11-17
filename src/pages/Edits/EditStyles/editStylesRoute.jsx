import { lazy } from "react";

const EditStylesPage = lazy(() => import("./EditStyles"));

export const editStylesRoute = {
  element: <EditStylesPage />,
};
