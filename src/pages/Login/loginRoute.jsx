import { lazy } from "react";

const LoginPage = lazy(() => import("./Login"));

export const loginRoute = {
  element: <LoginPage />,
};
