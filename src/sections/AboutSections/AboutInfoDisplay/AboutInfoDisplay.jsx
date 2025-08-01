import { AboutInfoTitle } from "../AboutInfo/AboutInfoTitle/AboutInfoTitle";
import imgBorder from "../../../assets/decor/lines/techOutline.svg";
import logo from "../../../assets/logo/logowCircle.svg";
import ben from "../../../assets/decor/imgs/techOutlineBen.svg";
import "./aboutinfodisplay.css";
import { AboutInfoBlerb } from "../AboutInfo/AboutInfoBlerb/AboutInfoBlerb";

export function AboutInfoDisplayNDP({ title1, title2, blerb }) {
  return (
    <section className="about-display-main">
      <div className="about-info">
        <AboutInfoTitle title1={title1} title2={title2} />
        <AboutInfoBlerb blerb={blerb} />
      </div>
      <div className="about-img-container">
        <img src={imgBorder} className="about-img-border" />
        <img src={logo} className="about-img" />
      </div>
    </section>
  );
}
export function AboutInfoDisplayNDPPhone({ title1, title2, blerb }) {
  return (
    <section className="about-display-main">
      <div className="about-info">
        <AboutInfoTitle title2={title2} title1={title1} />
      </div>

      <div className="about-img-container">
        <img src={imgBorder} className="about-img-border" />
        <img src={logo} className="about-img" />
      </div>

      <div className="about-info">
        <AboutInfoBlerb blerb={blerb} />
      </div>
    </section>
  );
}
export function AboutInfoDisplayBen({ title1, title2, blerb }) {
  return (
    <section className="about-display-main">
      <div className="about-info mt">
        <AboutInfoTitle title1={title1} title2={title2} />
        <AboutInfoBlerb blerb={blerb} />
      </div>
      <div className="about-img-container">
        <img src={ben} className="about-img-border" />
      </div>
    </section>
  );
}
export function AboutInfoDisplayBenPhone({ title1, title2, blerb }) {
  return (
    <section className="about-display-main">
      <div className="about-info mt">
        <AboutInfoTitle title1={title1} title2={title2} />
      </div>

      <div className="about-img-container">
        <img src={ben} className="about-img-border" />
      </div>

      <div className="about-info">
        <AboutInfoBlerb blerb={blerb} />
      </div>
    </section>
  );
}
