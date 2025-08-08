import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { ErrorLayout } from "./layouts/ErrorLayout";
import { landingRoute } from "./pages/LP/lpRoute";
import { aboutRoute } from "./pages/About/aboutRoute";
import { classesRoute } from "./pages/Classes/classesRoute.jsx";
// import { singleClassRoute } from "./pages/SingleClass/singleClassRoute.jsx";
import { loginRoute } from "./pages/Login/loginRoute.jsx";
import { PrivateRoute } from "./components/PrivateRoute.jsx";
import { dashboardRoute } from "./pages/Dashboard/dashboardRoute.jsx";
import { createClassRoute } from "./pages/CreateClass/createClassRoute.jsx";
// import { aboutRoute } from "./pages/About/About";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorLayout />,
    children: [
      { path: "/", ...landingRoute },
      { path: "/about", ...aboutRoute },
      { path: "/classes", ...classesRoute },
      // { path: "/classes/singleClass/:id", ...singleClassRoute },
      { path: "/login", ...loginRoute },
      {
        path: "/dashboard",
        element: <PrivateRoute>{dashboardRoute.element}</PrivateRoute>,
      },
      {
        path: "/createClass",
        element: <PrivateRoute>{createClassRoute.element}</PrivateRoute>,
      },
    ],
  },
]);
