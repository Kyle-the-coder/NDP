import "./aboutinfotitle.css";

export function AboutInfoTitle({ title1, title2 }) {
  return (
    <section className="about-info-title-main">
      <h1 className="bebas-thin-font letter-space blue-text">{title1}</h1>
      <h1 className="bebas-thin-font letter-space blue-text">{title2}</h1>
    </section>
  );
}
