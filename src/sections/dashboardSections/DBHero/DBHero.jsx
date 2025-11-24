import { useEffect, useState } from "react";

import "./dbhero.css";

export function DBHero() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="db-hero-main-container">
      {windowWidth <= 600 ? (
        <>
          <h1 className="urban-font ">Welcome</h1>
          <h1 className="urban-font green-text">To Your</h1>
          <h1 className="urban-font green-text">Dashboard</h1>
        </>
      ) : (
        <>
          <h1 className="urban-font green-text">Welcome</h1>
          <h1 className="urban-font green-text">To Your</h1>
          <h1
            style={{ marginBottom: "10px" }}
            className="urban-font green-text"
          >
            Dashboard
          </h1>
        </>
      )}
    </section>
  );
}
