import { Footer } from "../../components/Footer/Footer";
import { Bio } from "../../sections/LandingSections/Bio/Bio";
import { Hero } from "../../sections/LandingSections/Hero/Hero";
import { Styles } from "../../sections/LandingSections/DanceStyles/Styles";
import { Vid } from "../../sections/LandingSections/Vid/Vid";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Lp() {
  const wrapperRef = useRef(null);
  useEffect(() => {
    gsap.to(wrapperRef.current, {
      opacity: 1,
      duration: 1.6,
      ease: "power2.out",
    });
  }, []);
  return (
    <section className="display-column" ref={wrapperRef} style={{ opacity: 0 }}>
      <Hero />
      <Vid />
      <Bio />
      <Styles />
    </section>
  );
}
