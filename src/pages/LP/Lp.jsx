import { Footer } from "../../components/Footer/Footer";
import { Bio } from "../../sections/LandingSections/Bio/Bio";
import { Hero } from "../../sections/LandingSections/Hero/Hero";
import { Styles } from "../../sections/LandingSections/DanceStyles/Styles";
import { Vid } from "../../sections/LandingSections/Vid/Vid";

export default function Lp() {
  return (
    <section className="display-column">
      <Hero />
      <Vid />
      <Bio />
      <Styles />
    </section>
  );
}
