// ClassesPage.jsx
import { useContext, useEffect, useRef } from "react";
import { PageTitle } from "../../../components/PageTitle/PageTitle";
import { Card } from "../../../components/Card/Card";
import { Button } from "../../../components/Button/Button";
import { InfoContext } from "../../../contexts/infoContext";
import { scrollToSection } from "../../../components/SmoothScroll";
import { SelectedCardContext } from "../../../contexts/selectedCardContext";
import gsap from "gsap";

import "./classes.css";

export default function ClassesPage() {
  const infoData = useContext(InfoContext);
  const classesData = infoData.classes.allClasses || [];
  const wrapperRef = useRef(null);

  const { selectedId, setSelectedId } = useContext(SelectedCardContext);
  // Fade in when page mounts
  useEffect(() => {
    gsap.to(wrapperRef.current, {
      opacity: 1,
      duration: 1.6,
      ease: "power2.out",
    });
  }, []);

  const cardArray = classesData.map((data) => {
    const desc = data.description || "";
    return {
      class: true,
      title: data.title,
      blerb:
        desc.split(" ").length > 15
          ? desc.split(" ").slice(0, 15).join(" ") + "..."
          : desc,
      link: data.link || "",
      id: data.id,
    };
  });

  // Fade-out transition handler passed to cards
  const handlePageLeave = (navigateCallback) => {
    gsap.to(wrapperRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.in",
      onComplete: () => {
        scrollToSection("#nav");
        setTimeout(() => navigateCallback(), 700);
      },
    });
  };

  return (
    <section className="classes-main" ref={wrapperRef} style={{ opacity: "0" }}>
      <div className="classes-z-index">
        <PageTitle
          title="EXPLORE OUR GALACTIC MOVES"
          blerb="Choose Your Style. Step Into Your Power."
        />

        <div className="classes-grid">
          {cardArray.length <= 0 ? (
            <h1
              className="bebas-thin-font"
              style={{
                fontSize: "clamp(3rem, 4vw, 5rem)",
                marginBottom: "200px",
                marginTop: "150px",
              }}
            >
              No Classes posted at this Time😢
            </h1>
          ) : (
            cardArray.map((info, index) => (
              <Card
                key={index}
                isClass={info.class}
                title={info.title}
                blerb={info.blerb}
                id={info.id}
                onNav={handlePageLeave}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
              />
            ))
          )}
        </div>

        <div className="classes-sign-up">
          <div className="purple-bar"></div>
          <h1 className="bebas-thin-font yellow-text">
            Your Training Begins Now-
          </h1>
          <h1 className="bebas-thin-font yellow-text">Join The Mission</h1>
          <Button text="Sign Up Here" />
          <div className="purple-bar"></div>
        </div>
      </div>
    </section>
  );
}
