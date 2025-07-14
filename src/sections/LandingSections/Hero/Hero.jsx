import heroDancer from "../../../assets/hero/NBDHeroDancer.png";
import landingBg from "../../../assets/hero/NBDHeroBg.webp";
import border from "../../../assets/decor/lines/border.svg";
import phoneBorder from "../../../assets/decor/lines/phoneBorder.svg";
import { Button } from "../../../components/Button/Button";
import { useEffect, useState } from "react";
import "./hero.css";

export function Hero() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <section className="display-column">
      <div className="landing-main">
        <img src={landingBg} className="landing-bg" />
        <div className="vignette"></div>
        <div className="landing-content">
          <h1 className="anton-thin-font letter-space purple-text">Nebula</h1>
          <h1 className="anton-thin-font letter-space blue-text">Dance</h1>
          <h1 className="anton-thin-font letter-space blue-text">Program</h1>
          <p className="urban-thin-font letter-space">
            Lorem ipsum dolor sit amet, consectetur adispicsing, se do atuir,
            jkjkl ut labor et delore de magna.
          </p>
          <Button text="Join the Mission" />
        </div>
        <img src={heroDancer} className="hero-dancer" />
      </div>
      {windowWidth <= 900 ? (
        <img src={phoneBorder} className="border" />
      ) : (
        <img src={border} className="border" />
      )}
    </section>
  );
}
