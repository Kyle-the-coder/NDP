import { Bio } from "../../../sections/LandingSections/Bio/Bio";
import { Hero } from "../../../sections/LandingSections/Hero/Hero";
import { Styles } from "../../../sections/LandingSections/DanceStyles/Styles";
import { Vid } from "../../../sections/LandingSections/Vid/Vid";
import { useContext, useEffect, useMemo, useRef } from "react";
import { InfoContext } from "../../../contexts/infoContext";
import gsap from "gsap";

export default function Lp() {
  const stylesInfo = useContext(InfoContext);

  const wrapperRef = useRef(null);

  const classData = useMemo(() => {
    if (!stylesInfo?.danceStyles?.allStyles) return null;
    return stylesInfo.danceStyles.allStyles || null;
  }, [stylesInfo]);

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
      <Styles stylesInfo={classData} />
    </section>
  );
}
