import logo from "../../assets/logo/NBDLogo.svg";
import fb from "../../assets/icons/functIcons/facebook-logo.png";
import ig from "../../assets/icons/functIcons/instagram.png";
import email from "../../assets/icons/functIcons/envelope.png";
import border from "../../assets/decor/lines/border.svg";
import phoneBorder from "../../assets/decor/lines/phoneBorder.svg";
import "./footer.css";
import { Button } from "../Button/Button";
import { useEffect, useState } from "react";
import { TechDisplay } from "../TechDisplay/TechDisplay";

export function Footer() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <section id="footer" className="footer-main">
      {windowWidth <= 900 ? (
        <img src={phoneBorder} className="border" />
      ) : (
        <img src={border} className="border-footer" />
      )}
      <div className="logo-container">
        <img src={logo} className="footer-logo" />
      </div>

      <div className="flex-evenly phone-padding">
        <TechDisplay
          center={
            <>
              <h1 className="bebas-thin-font letter-space footer-text">
                Class Info:
              </h1>
              <div className="content-container center">
                <Button
                  fontSize={
                    windowWidth <= 900 ? "2rem" : "clamp(2rem, 4vw, 3rem)"
                  }
                  text="Sign Up Here"
                />
              </div>
            </>
          }
        />

        <TechDisplay
          center={
            <>
              <h1
                className="bebas-thin-font letter-space footer-text"
                style={{ marginBottom: windowWidth <= 900 && "10px" }}
              >
                Contact:
              </h1>
              <div className="content-container">
                <img src={fb} className="contact-icon" />
                <img src={ig} className="contact-icon" />
                <img src={email} className="contact-icon" />
              </div>
            </>
          }
        />
      </div>
    </section>
  );
}
