import logo from "../../assets/logo/NBDLogo.svg";
import fb from "../../assets/icons/functIcons/facebook-logo.png";
import ig from "../../assets/icons/functIcons/instagram.png";
import email from "../../assets/icons/functIcons/envelope.png";
import border from "../../assets/decor/lines/border.svg";
import phoneBorder from "../../assets/decor/lines/phoneBorder.svg";
import login from "../../assets/icons/functIcons/person.png";
import { Button } from "../Button/Button";
import { useEffect, useState } from "react";
import { TechDisplay } from "../TechDisplay/TechDisplay";
import "./footer.css";
import { useNavigate } from "react-router-dom";

export function Footer() {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <section id="footer" className="footer-main-container">
      {windowWidth <= 900 ? (
        <img src={phoneBorder} className="border" />
      ) : (
        <img src={border} className="border-footer" />
      )}
      <div className="logo-container">
        <img src={logo} className="footer-logo" />
      </div>
      <div className="footer-main">
        <img
          className="footer-login"
          src={login}
          onClick={() => {
            navigate("/login");
            window.scrollTo(0, 0);
          }}
        />

        <div className="classes-sign-up">
          <div className="blue-bar"></div>
          <h1 className="bebas-thin-font yellow-text">Class Info:</h1>
          <Button text="See info here" />
          <div className="blue-bar" style={{ marginBottom: "100px" }}></div>
        </div>
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
