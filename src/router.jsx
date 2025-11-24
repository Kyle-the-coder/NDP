import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { ErrorLayout } from "./layouts/ErrorLayout";
import { landingRoute } from "./pages/Display/LP/lpRoute.jsx";
import { aboutRoute } from "./pages/Display/About/aboutRoute.jsx";
import { classesRoute } from "./pages/Display/Classes/classesRoute.jsx";
import { loginRoute } from "./pages/Display/Login/loginRoute.jsx";
import { PrivateRoute } from "./components/PrivateRoute.jsx";
import { dashboardRoute } from "./pages/Display/Dashboard/dashboardRoute.jsx";
import { createClassRoute } from "./pages/Creates/CreateClass/createClassRoute.jsx";
import { editClassesRoute } from "./pages/Edits/EditClasses/editClassesRoute.jsx";
import { singleClassRoute } from "./pages/Display/SingleClass/singleClassRoute.jsx";
import { danceStyleRoute } from "./pages/Display/DanceStyle/danceStyleRoute.jsx";
import { createStyleRoute } from "./pages/Creates/CreateStyle/createStyleRoute.jsx";
import { editClassRoute } from "./pages/Edits/EditClass/editClassRoute.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorLayout />,
    children: [
      { path: "/", ...landingRoute },
      { path: "/about", ...aboutRoute },
      { path: "/classes", ...classesRoute },
      { path: "/singleClass/:id", ...singleClassRoute },
      { path: "/login", ...loginRoute },
      { path: "/singleStyle/:id", ...danceStyleRoute },
      {
        path: "/dashboard",
        element: <PrivateRoute>{dashboardRoute.element}</PrivateRoute>,
      },
      {
        path: "/createClass",
        element: <PrivateRoute>{createClassRoute.element}</PrivateRoute>,
      },
      {
        path: "/editClasses",
        element: <PrivateRoute>{editClassesRoute.element}</PrivateRoute>,
      },
      {
        path: "/editClass/:id",
        element: <PrivateRoute>{editClassRoute.element}</PrivateRoute>,
      },
      {
        path: "/createStyle",
        element: <PrivateRoute>{createStyleRoute.element}</PrivateRoute>,
      },
      {
        path: "/editStyles",
        element: <PrivateRoute>{editClassesRoute.element}</PrivateRoute>,
      },
    ],
  },
]);
