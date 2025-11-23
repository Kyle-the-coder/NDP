import { useEffect, useContext, useRef, useState } from "react";
import stylesBg from "../../../assets/hero/NBDHeroBg.webp";
import { SelectedCardContext } from "../../../contexts/selectedCardContext";
import "./styles.css";
import { Card } from "../../../components/Card/Card";

export function Styles({ stylesInfo, onNav }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const contentRefs = useRef([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { selectedId, setSelectedId } = useContext(SelectedCardContext);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="display-column">
      <div className="styles-main">
        <img src={stylesBg} className="styles-bg" />
        <h1 className="bebas-thin-font blue-text styles-title">Dance Styles</h1>
        <div className="styles-grid">
          {stylesInfo.map((info, index) => (
            <Card
              key={index}
              png={info.png}
              title={info.title}
              blerb={info.description}
              isStyle={true}
              id={info.id}
              onNav={onNav}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
