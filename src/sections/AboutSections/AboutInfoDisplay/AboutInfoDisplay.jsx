import { AboutInfoTitle } from "../AboutInfo/AboutInfoTitle/AboutInfoTitle";
import imgBorder from "../../../assets/decor/lines/techOutline.svg";
import logo from "../../../assets/logo/logowCircle.svg";
import ben from "../../../assets/decor/imgs/techOutlineBen.svg";
import "./aboutinfodisplay.css";
import { AboutInfoBlerb } from "../AboutInfo/AboutInfoBlerb/AboutInfoBlerb";

export function AboutInfoDisplayNDP() {
  return (
    <section className="about-display-main">
      <div className="about-info">
        <AboutInfoTitle />
        <AboutInfoBlerb />
      </div>
      <div className="about-img-container">
        <img src={imgBorder} className="about-img-border" />
        <img src={logo} className="about-img" />
      </div>
    </section>
  );
}
export function AboutInfoDisplayBen() {
  return (
    <section className="about-display-main">
      <div className="about-info mt">
        <AboutInfoTitle />
        <AboutInfoBlerb />
      </div>
      <div className="about-img-container">
        <img src={ben} className="about-img-border" />
      </div>
    </section>
  );
}
