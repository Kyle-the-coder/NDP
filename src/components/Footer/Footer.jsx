import logo from "../../assets/logo/NBDLogo.png";
import techOutline from "../../assets/decor/lines/techOutline.svg";
import fb from "../../assets/icons/functIcons/facebook-logo.png";
import ig from "../../assets/icons/functIcons/instagram.png";
import email from "../../assets/icons/functIcons/envelope.png";
import "./footer.css";
import { Button } from "../Button/Button";
import { useEffect, useState } from "react";

export function Footer() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <section id="footer" className="footer-main">
      <div className="logo-container">
        <img src={logo} className="footer-logo" />
        <div className="footer-shine"></div>
      </div>

      <div className="footer-content-container">
        <div className="footer-content">
          <h1 className="bebas-thin-font letter-space">Class Info:</h1>
          <div className="content-container center">
            <Button
              fontSize={windowWidth <= 900 ? "2rem" : "3rem"}
              text="Sign Up Here"
            />
          </div>

          <img src={techOutline} className="footer-content-decor" />
        </div>

        <div className="footer-content">
          <h1
            className="bebas-thin-font letter-space"
            style={{ marginBottom: windowWidth <= 900 && "10px" }}
          >
            Contact:
          </h1>
          <div className="content-container">
            <img src={fb} className="contact-icon" />
            <img src={ig} className="contact-icon" />
            <img src={email} className="contact-icon" />
          </div>

          <img src={techOutline} className="footer-content-decor" />
        </div>
      </div>
    </section>
  );
}
