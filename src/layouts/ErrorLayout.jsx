import { Outlet, useNavigation } from "react-router-dom";

import { Nav } from "../components/Nav/Nav";
import { Footer } from "../components/Footer/Footer";
export function ErrorLayout() {
  const { state } = useNavigation();

  return (
    <div className="main-container">
      <Nav />
      {state === "loading" ? "loading..." : <h1>Error</h1>}
      <Footer />
    </div>
  );
}
