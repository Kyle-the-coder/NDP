import "./card.css";

export function Card({ title, blerb, png, link, isClass = false }) {
  return (
    <section className="card-main">
      <div className="card-top">
        {png && <img className="card-img" src={png} />}
        <h1 className="anton-thin-font blue-text letter-space">{title}</h1>
      </div>
      <div className="card-mid">
        <p className="urban-thin-font">{blerb}</p>
      </div>
      <div className="card-bottom">
        <a href={link}>
          {isClass ? (
            <>
              <p className="urban-thin-font blue-text">More Info {`>`}</p>
            </>
          ) : (
            <>
              <p className="urban-thin-font blue-text">Watch Video {`>`}</p>
            </>
          )}
        </a>
      </div>
    </section>
  );
}
