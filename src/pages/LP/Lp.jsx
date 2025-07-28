import { Footer } from "../../components/Footer/Footer";
import { Bio } from "../../sections/LandingSections/Bio/Bio";
import { Hero } from "../../sections/LandingSections/Hero/Hero";
import { Styles } from "../../sections/LandingSections/DanceStyles/Styles";

export default function Lp() {
  return (
    <section className="display-column">
      <Hero />
      <Bio />
      <Styles />
    </section>
  );
}
