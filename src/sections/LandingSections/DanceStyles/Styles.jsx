import { useEffect, useRef, useState } from "react";
import { Button } from "../../../components/Button/Button";
import stylesBg from "../../../assets/hero/NBDHeroBg.webp";
import minus from "../../../assets/icons/functIcons/shrink.png";
import plus from "../../../assets/icons/functIcons/expand.png";
import "./styles.css";

export function Styles() {
  const [activeIndex, setActiveIndex] = useState(null);
  const contentRefs = useRef([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const levelsInfo = [
    {
      title: "Popping",
      blurb:
        "Popping is Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. Ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit. In voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
      button: <Button text="Popping Classes" />,
    },
    {
      title: "Waving",
      blurb:
        "Waving is Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. Ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit. In voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
      button: <Button text="Waving Classes" />,
    },
    {
      title: "Freestyle",
      blurb:
        "Freestyle is Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. Ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit. In voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
      button: <Button text="Freestyle Classes" />,
    },
    {
      title: "Tutting",
      blurb:
        "Tutting is Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. Ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit. In voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
      button: <Button text="Tutting Classes" />,
    },
  ];

  function handleIndex(index) {
    setActiveIndex(index);
  }

  function clearIndex() {
    setActiveIndex(null);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest(".faq-card")) {
        clearIndex();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <section className="display-column">
      <div className="styles-main">
        <img src={stylesBg} className="styles-bg" />
        <h1 className="bebas-thin-font blue-text styles-title">Dance Styles</h1>
        <div className="faq-cards-container">
          {levelsInfo.map((info, index) => (
            <div
              className="faq-card"
              onClick={() => {
                activeIndex === index ? clearIndex() : handleIndex(index);
              }}
              key={info.title}
              style={{
                backgroundColor:
                  activeIndex === index
                    ? "rgba(0, 0, 0, 0.946)"
                    : "rgba(0, 0, 0, 0.84)",
              }}
            >
              <div className="faq-card-title">
                <h1
                  className={`anton-thin-font letter-space ${
                    activeIndex === index && "yellow-text underline"
                  } `}
                  style={{
                    transition: "all .4s",
                    fontSize: "3rem",
                  }}
                >
                  {info.title}
                </h1>
                {activeIndex === index ? (
                  <img src={minus} onClick={() => clearIndex()} />
                ) : (
                  <img src={plus} onClick={() => handleIndex(index)} />
                )}
              </div>
              <div
                className="faq-card-info"
                ref={(el) => (contentRefs.current[index] = el)}
                style={{
                  maxHeight:
                    activeIndex === index
                      ? `${contentRefs.current[index]?.scrollHeight + 500}px`
                      : "0px",
                  opacity: activeIndex === index ? "1" : "0",
                  overflow: "hidden",
                  paddingTop: activeIndex === index ? "50px" : "0px",
                }}
              >
                <p className="urban-thin-font" style={{ marginBottom: "20px" }}>
                  {info.blurb}
                </p>
                {info.button}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
