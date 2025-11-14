import { useContext } from "react";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { Card } from "../../components/Card/Card";
import { Button } from "../../components/Button/Button";

import classesBg from "../../assets/decor/imgs/NDPAboutBg.png";
import "./classes.css";

import { InfoContext } from "../../contexts/infoContext";

export default function ClassesPage() {
  const infoData = useContext(InfoContext);

  const classesData = infoData.classes.allClasses || [];

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

  return (
    <section className="classes-main">
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
                isClass={info.class}
                key={index}
                title={info.title}
                blerb={info.blerb}
                link={info.link}
                id={info.id}
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
