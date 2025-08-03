import { useEffect, useState } from "react";
import "./pagetitle.css";

export function PageTitle({ title, blerb }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const titleWords = title.split(" ");
  const isExplore = titleWords[0]?.toLowerCase() === "explore";
  return (
    <section className="page-title-main">
      {windowWidth <= 900 ? (
        <>
          <div className="page-title-title">
            <div
              className={`light-blue-line ${isExplore ? "title-mb" : ""}`}
            ></div>
            <div className="display-column phone-title">
              {title.split(" ").map((word, index) => (
                <h1 key={index} className="bebas-thin-font blue-text">
                  {word}
                </h1>
              ))}
            </div>
            <div
              className={`light-blue-line ${isExplore ? "title-mb" : ""}`}
            ></div>
          </div>
          <div className="page-title-blerb">
            <p className="urban-thin-font letter-space">{blerb}</p>
          </div>
        </>
      ) : (
        <>
          <div className="page-title-title">
            <div className="light-blue-line"></div>
            <h1 className="bebas-font blue-text ">{title}</h1>
            <div className="light-blue-line"></div>
          </div>
          <div className="page-title-blerb">
            <p className="urban-thin-font letter-space">{blerb}</p>
          </div>
        </>
      )}
    </section>
  );
}
