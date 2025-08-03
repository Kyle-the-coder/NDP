// components/Nav/NavPhone.jsx
import logo from "../../../assets/logo/NBDLogo.svg";
import { Hamburger } from "../../Hamburger/Hamburger";
import "../nav.css";

export function NavPhone({
  navigate,
  handleActivateHamburger,
  isAnimationActive,
}) {
  return (
    <div className="logo-ham-container">
      <div className="logo">
        <img
          src={logo}
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
      <div
        className="nav-hamburger-container"
        onClick={handleActivateHamburger}
      >
        <Hamburger isOpened={isAnimationActive} />
      </div>
    </div>
  );
}
