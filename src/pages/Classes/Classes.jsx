import { useContext } from "react";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { Card } from "../../components/Card/Card";
import { Button } from "../../components/Button/Button";

import classesBg from "../../assets/decor/imgs/NDPAboutBg.png";
import "./classes.css";

import { InfoContext } from "../../contexts/infoContext";

export default function ClassesPage() {
  const classesData = useContext(InfoContext);

  // Prepare the card array similar to your original formatting
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
    };
  });

  return (
    <section className="classes-main">
      <img src={classesBg} className="classes-bg" />
      <div className="classes-z-index">
        <PageTitle
          title="EXPLORE OUR GALACTIC MOVES"
          blerb="Choose Your Style. Step Into Your Power."
        />
        <div className="classes-grid">
          {cardArray.map((info, index) => (
            <Card
              isClass={info.class}
              key={index}
              title={info.title}
              blerb={info.blerb}
              link={info.link}
            />
          ))}
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
