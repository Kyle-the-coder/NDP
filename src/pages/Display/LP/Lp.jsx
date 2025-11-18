import { Bio } from "../../../sections/LandingSections/Bio/Bio";
import { Hero } from "../../../sections/LandingSections/Hero/Hero";
import { Styles } from "../../../sections/LandingSections/DanceStyles/Styles";
import { Vid } from "../../../sections/LandingSections/Vid/Vid";
import { useContext, useEffect, useMemo, useRef } from "react";
import { InfoContext } from "../../../contexts/infoContext";
import {
  useOutletContext,
  useNavigationType,
  useNavigate,
} from "react-router-dom";
import { scrollToSection } from "../../../components/SmoothScroll";
import gsap from "gsap";
import {
  SelectedCardContext,
  SelectedCardProvider,
} from "../../../contexts/selectedCardContext";

export default function Lp() {
  const stylesInfo = useContext(InfoContext);
  const { backState } = useOutletContext();
  const wrapperRef = useRef(null);
  const navigationType = useNavigationType();
  const navigate = useNavigate();

  const classData = useMemo(() => {
    if (!stylesInfo?.danceStyles?.allStyles) return null;
    return stylesInfo.danceStyles.allStyles || null;
  }, [stylesInfo]);

  // Fade in the whole page wrapper
  useEffect(() => {
    gsap.to(wrapperRef.current, {
      opacity: 1,
      duration: 1.6,
      ease: "power2.out",
    });
  }, []);

  // Fade in specific card if navigating back
  useEffect(() => {
    // Ignore if refresh/direct load (POP) or no backState
    if (navigationType === "POP" || !backState?.fromBack) return;

    const targetId = backState.targetId;
    const el = document.getElementById(targetId);
    if (!el) return;

    // Jump instantly to element
    el.scrollIntoView({ behavior: "instant", block: "center" });

    // Fade-in animation
    gsap.fromTo(
      el,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );

    // Clear the state so future refreshes do not trigger it
    navigate(window.location.pathname, { replace: true, state: {} });
  }, [backState, navigationType, navigate]);

  // Fade-out transition handler passed to cards
  const handlePageLeave = (navigateCallback) => {
    gsap.to(wrapperRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.in",
      onComplete: () => {
        scrollToSection("#nav");
        setTimeout(() => navigateCallback(), 700);
      },
    });
  };

  return (
    <section className="display-column" ref={wrapperRef} style={{ opacity: 0 }}>
      <SelectedCardProvider>
        <Hero />
        <Vid />
        <Bio />
        <Styles stylesInfo={classData} onNav={handlePageLeave} />
      </SelectedCardProvider>
    </section>
  );
}
