import { useEffect, useState } from "react";
import "./pagetitle.css";

export function PageTitle() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <section className="page-title-main">
      {windowWidth <= 900 ? (
        <>
          <div className="page-title-title">
            <div className="light-blue-line"></div>
            <div className="display-column phone-title">
              <h1 className="bebas-thin-font blue-text ">WHO</h1>
              <h1 className="bebas-thin-font blue-text ">WE </h1>
              <h1 className="bebas-thin-font blue-text ">ARE</h1>
            </div>
            <div className="light-blue-line"></div>
          </div>
          <div className="page-title-blerb">
            <p className="urban-thin-font letter-space">
              Meet the minds behind the movement
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="page-title-title">
            <div className="light-blue-line"></div>
            <h1 className="bebas-font blue-text ">WHO WE ARE</h1>
            <div className="light-blue-line"></div>
          </div>
          <div className="page-title-blerb">
            <p className="urban-thin-font letter-space">
              Meet the minds behind the movement
            </p>
          </div>
        </>
      )}
    </section>
  );
}
