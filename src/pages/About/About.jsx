import aboutBg from "../../assets/decor/imgs/NDPAboutBg.png";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import {
  AboutInfoDisplayBen,
  AboutInfoDisplayNDP,
} from "../../sections/AboutSections/AboutInfoDisplay/AboutInfoDisplay";
import "./about.css";

export default function AboutPage() {
  return (
    <section className="about-main">
      <img src={aboutBg} className="about-bg" />
      <div className="about-z-index">
        <PageTitle />

        <AboutInfoDisplayNDP />
        <AboutInfoDisplayBen />
      </div>
    </section>
  );
}
