import { PageTitle } from "../../components/PageTitle/PageTitle";

import classesBg from "../../assets/decor/imgs/NDPAboutBg.png";
import "./classes.css";
import { Card } from "../../components/Card/Card";
import popping from "../../assets/icons/decorIcons/PoppingIconTB.png";
import tutting from "../../assets/icons/decorIcons/TuttingIconTB.png";
import waving from "../../assets/icons/decorIcons/WavingIconTB.png";
import freestyle from "../../assets/icons/decorIcons/FreestyleIconTB.png";
import { Button } from "../../components/Button/Button";

export default function ClassesPage() {
  const cardArray = [
    {
      png: popping,
      title: "Popping",
      blerb:
        "Learn the fundamentals of popping, muscle control, and rhythmic precision",
      link: "",
    },
    {
      png: tutting,
      title: "Tutting",
      blerb: "Master geometric arm angles and intricate hand contorl sequences",
      link: "",
    },
    {
      png: waving,
      title: "Waving",
      blerb:
        "Develop fluid motion techniques that travel from fingertips to full body.",
      link: "",
    },
    {
      png: freestyle,
      title: "Freestyle",
      blerb:
        "Build confidence through structured freestyle drills and cyphers.",
      link: "",
    },
  ];
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
              key={index}
              png={info.png}
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
