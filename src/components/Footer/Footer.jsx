import logo from "../../assets/logo/NBDLogo.png";
import "./footer.css";

export function Footer() {
  return (
    <section id="footer" className="footer-main">
      <div className="logo-container">
        <img src={logo} className="footer-logo" />
        <div className="shine"></div>
      </div>
    </section>
  );
}
