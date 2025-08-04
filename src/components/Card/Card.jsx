import "./card.css";
import popping from "../../assets/icons/decorIcons/PoppingIconTB.png";
import tutting from "../../assets/icons/decorIcons/TuttingIconTB.png";
import waving from "../../assets/icons/decorIcons/WavingIconTB.png";
import freestyle from "../../assets/icons/decorIcons/FreestyleIconTB.png";

export function Card({ title, blerb, png, link }) {
  const cardArray = [
    {
      png: { popping },
      title: "Popping",
      blerb:
        "Learn the fundamentals of popping, muscle control, and rhythmic precision",
      link: "",
    },
    {
      png: { tutting },
      title: "Tutting",
      blerb: "Master geometric arm angles and intricate hand contorl sequences",
      link: "",
    },
    {
      png: { waving },
      title: "Waving",
      blerb:
        "Develop fluid motion techniques that travel from fingertips to full body.",
      link: "",
    },
    {
      png: { freestyle },
      title: "Freestyle",
      blerb:
        "Build confidence through structured freestyle drills and cyphers.",
      link: "",
    },
  ];
  return (
    <section className="card-main">
      <div className="card-top">
        <img className="card-img" src={png} />
        <h1 className="anton-thin-font blue-text letter-space">{title}</h1>
      </div>
      <div className="card-mid">
        <p className="urban-thin-font">{blerb}</p>
      </div>
      <div className="card-bottom">
        <a href={link}>
          <p className="urban-thin-font blue-text">Watch Video {`>`}</p>
        </a>
      </div>
    </section>
  );
}
