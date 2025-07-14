import logo from "../../assets/logo/NBDLogo.png";
import contentDecor from "../../assets/decor/lines/SpaceLineDecorTB.png";
import fb from "../../assets/icons/functIcons/facebook-logo.png";
import ig from "../../assets/icons/functIcons/instagram.png";
import email from "../../assets/icons/functIcons/envelope.png";
import "./footer.css";
import { Button } from "../Button/Button";

export function Footer() {
  return (
    <section id="footer" className="footer-main">
      <div className="logo-container">
        <img src={logo} className="footer-logo" />
        <div className="footer-shine"></div>
      </div>

      <div className="footer-content-container">
        <div className="footer-content">
          <div className="content-info">
            <h1 className="bebas-thin-font letter-space">Class Info:</h1>
            <div className="content-button">
              <Button fontSize="3rem" text="Sign Up Here" />
            </div>
          </div>
          <img src={contentDecor} className="footer-content-decor" />
        </div>
        <div className="footer-content">
          <div className="content-info">
            <h1 className="bebas-thin-font letter-space">Contact:</h1>
            <div className="content-icon-container">
              <img src={fb} className="contact-icon" />
              <img src={ig} className="contact-icon" />
              <img src={email} className="contact-icon" />
            </div>
          </div>
          <img
            src={contentDecor}
            className="footer-content-decor-right footer-roto"
          />
        </div>
      </div>
    </section>
  );
}
