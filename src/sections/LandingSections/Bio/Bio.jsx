import { Button } from "../../../components/Button/Button";
import bioImg from "../../../assets/aboutImg/BenAbout.png";
import bioDecor from "../../../assets/decor/imgs/SpaceDecorHex.webp";
import waveDblue from "../../../assets/decor/waves/waveDblue.svg";
import waveLb1 from "../../../assets/decor/waves/waveLb1.svg";
import waveLb2 from "../../../assets/decor/waves/waveLb2.svg";
import "./bio.css";
import { useEffect, useState } from "react";

export function Bio() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const bioTitle = (
    <div className="bio-title">
      {windowWidth <= 900 ? (
        <>
          <h1 className="bebas-thin-font letter-spacing blue-text">Ben</h1>
          <h1 className="bebas-thin-font letter-spacing blue-text">"Nebula"</h1>
          <h1 className="bebas-thin-font letter-spacing blue-text">Donner</h1>
        </>
      ) : (
        <>
          <h1 className="bebas-thin-font letter-spacing blue-text">
            Ben "Nebula" Donner
          </h1>
        </>
      )}
    </div>
  );
  const bioContent = (
    <div className="bio-content">
      <p className="urban-thin-font letter-spacing">
        Ben “Nebula” Donner is the founder and owner of the Nebula Dance
        Program. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi. Ut aliquip
        ex ea commodo consequat. Duis aute irure dolor in reprehenderit. In
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
        sint occaecat cupidatat non proident, sunt in culpa. Qui officia
        deserunt mollit anim id est laborum. Curabitur .
      </p>
      <Button text="More Info" margin="0 auto" />
    </div>
  );
  const bioPic = (
    <div className="bio-pic-container">
      <img src={bioDecor} className="bio-decor" />
      <img src={bioImg} className="bio-pic" />
      <div className="bio-pic-fade"></div>
    </div>
  );

  return (
    <section className="display-column">
      <div className="bio-main">
        {windowWidth <= 900 ? (
          <>
            {bioTitle}
            {bioPic}
            {bioContent}
          </>
        ) : (
          <>
            {bioPic}
            <div className="bio-title-content-container">
              {bioTitle}
              {bioContent}
            </div>
          </>
        )}
      </div>

      <div className="about-waves">
        <img src={waveDblue} className="about-wave-1" />
        <img src={waveLb1} className="about-wave-2" />
        <img src={waveLb2} className="about-wave-3" />
      </div>
    </section>
  );
}
