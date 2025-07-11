import { Loader } from "../../components/Loader/Loader";
import landingBg from "../../assets/hero/NBDHeroBg.webp";
import "./lp.css";

export default function Lp() {
  return (
    <section className="display-column landing-main">
      <img src={landingBg} className="landing-bg" />
    </section>
  );
}
