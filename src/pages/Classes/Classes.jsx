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
      class: true,
      title: "Galactic Mini's",
      blerb:
        "Beginners ages 5-7, intro to our 3 styles of dance plus freestyle",
      link: "",
    },
    {
      class: true,
      title: "Rockateers",
      blerb:
        "Beginners ages 8-11, intro to our 3 styles of dance plus freestyle",
      link: "",
    },
    {
      class: true,
      title: "Astronauts",
      blerb:
        "Beginners ages 12+, intro to our 3 styles of dance plus freestyle",
      link: "",
    },
    {
      class: true,
      title: "Technicians",
      blerb:
        "Advance ages 12+, advance classes include our 3 styles plus 2 shows a year",
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
