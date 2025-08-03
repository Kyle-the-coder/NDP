import "./card.css";

export function Card({ title, blerb, png, link }) {
  return (
    <section className="card-main">
      <div className="card-top">
        <img className="card-img" />
        <h1 className="bebas-font blue-text">{title}</h1>
      </div>
      <div className="card-mid">
        <p className="urban-thin-font">{blerb}</p>
      </div>
      <div className="card-bottom">
        <a href={link}>
          <p className="urban-font blue-text">Watch Video {`>`}</p>
        </a>
      </div>
    </section>
  );
}
