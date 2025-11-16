import { useEffect, useState, useRef } from "react";
import aboutBg from "../../assets/decor/imgs/NDPAboutBg.png";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import {
  AboutInfoDisplayBen,
  AboutInfoDisplayBenPhone,
  AboutInfoDisplayNDP,
  AboutInfoDisplayNDPPhone,
} from "../../sections/AboutSections/AboutInfoDisplay/AboutInfoDisplay";
import gsap from "gsap";
import "./about.css";

export default function AboutPage() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const wrapperRef = useRef(null);
  useEffect(() => {
    gsap.to(wrapperRef.current, {
      opacity: 1,
      duration: 1.6,
      ease: "power2.out",
    });
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <section className="about-main" ref={wrapperRef} style={{ opacity: "0" }}>
      <div className="about-z-index">
        <PageTitle
          title="WHO WE ARE"
          blerb="Meet The Minds Behind The Movement"
        />
        {windowWidth <= 900 ? (
          <>
            <AboutInfoDisplayNDPPhone
              title1="About Nebula"
              title2="Dance Program"
              blerb="Nebula Dance Program is a future-forward hip hop studio where rhythm meets innovation. We combine classic street styles with modern techniques in an environment that inspires individuality, strength, and cosmic-level creativity. Whether you're a beginner or an aspiring professional, Nebula is your orbit."
            />
          </>
        ) : (
          <>
            <AboutInfoDisplayNDP
              title1="About Nebula"
              title2="Dance Program"
              blerb="Nebula Dance Program is a future-forward hip hop studio where rhythm meets innovation. We combine classic street styles with modern techniques in an environment that inspires individuality, strength, and cosmic-level creativity. Whether you're a beginner or an aspiring professional, Nebula is your orbit."
            />
          </>
        )}
        {windowWidth <= 900 ? (
          <>
            <AboutInfoDisplayBenPhone
              title1="About Ben"
              title2={`"Nebula" Donner`}
              blerb="Nebula Dance Program is a future-forward hip hop studio where rhythm meets innovation. We combine classic street styles with modern techniques in an environment that inspires individuality, strength, and cosmic-level creativity. Whether you're a beginner or an aspiring professional, Nebula is your orbit."
            />
          </>
        ) : (
          <>
            <AboutInfoDisplayBen
              title1="About Ben"
              title2={`"Nebula" Donner`}
              blerb="Nebula Dance Program is a future-forward hip hop studio where rhythm meets innovation. We combine classic street styles with modern techniques in an environment that inspires individuality, strength, and cosmic-level creativity. Whether you're a beginner or an aspiring professional, Nebula is your orbit."
            />
          </>
        )}

        <div className="about-quote-container">
          <h1 className="anton-font letter-space">
            "We don't just teach steps- we launch dancers into their potential"
          </h1>
        </div>
      </div>
    </section>
  );
}
