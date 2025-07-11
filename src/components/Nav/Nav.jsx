import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { NavPhone } from "./NavP/NavPhone";
import { NavDesktop } from "./NavD/NavDesktop";
import { scrollToSection } from "../SmoothScroll";
import navDecor from "../../assets/decor/imgs/nav-decor.svg";
import navDecorLine from "../../assets/decor/lines/gradLine.svg";
import gsap from "gsap";
import "./nav.css";

export function Nav() {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isHamburgerActive, setIsHamburgerActive] = useState(null);
  const [isAnimationActive, setIsAnimtionActive] = useState(null);
  const navigate = useNavigate();

  const links = [
    { linkName: "Home", link: "/" },
    { linkName: "About", link: "/about" },
    { linkName: "Classes", link: "/classes" },
    { linkName: "Contact", link: "#footer" },
  ];

  const handleMouseEnter = useCallback((index) => setHoverIndex(index), []);
  const handleMouseLeave = useCallback(() => setHoverIndex(null), []);

  function handleActivateHamburger() {
    if (!isHamburgerActive) {
      setIsHamburgerActive(true);
      setIsAnimtionActive(true);
    } else {
      setIsAnimtionActive(false);
      gsap.to(".navbar-phone-dropdown-container", {
        x: "-100%",
        duration: 1.2,
        ease: "power4.in",
        onComplete: () => setIsHamburgerActive(false),
      });
    }
  }

  function handleScrollTo(link) {
    if (isHamburgerActive) {
      if (link === "#footer") {
        handleActivateHamburger();
        setTimeout(() => scrollToSection(link), 1300);
      } else {
        navigate(link);
        handleActivateHamburger();
      }
    } else {
      link === "#footer" ? scrollToSection(link) : navigate(link);
    }
  }

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (hoverIndex !== null) {
      gsap.from(".active", {
        scaleX: 0,
        transformOrigin: "50% 50%",
        ease: "power4.out",
        duration: 0.8,
      });
    }
  }, [hoverIndex]);

  useEffect(() => {
    if (isHamburgerActive) {
      gsap.from(".navbar-phone-dropdown-container", {
        transform: "translateX(-100%)",
        duration: 1.2,
        ease: "power3.inOut",
      });
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isHamburgerActive]);

  return (
    <nav id="nav" className="nav-main-container">
      <div className="nav-overflow-container">
        {windowWidth <= 900 ? (
          <NavPhone
            navigate={navigate}
            handleActivateHamburger={handleActivateHamburger}
            isAnimationActive={isAnimationActive}
          />
        ) : (
          <NavDesktop
            links={links}
            hoverIndex={hoverIndex}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            handleScrollTo={handleScrollTo}
            navigate={navigate}
          />
        )}
      </div>

      {isHamburgerActive && (
        <div className="navbar-phone-dropdown-container charcoal-bg">
          <div className="dropdown-links-container">
            {links.map((link, index) => (
              <div key={link.linkName}>
                <h3
                  className="archivo-font dropdown-link-name"
                  onClick={() => {
                    handleMouseEnter(index);
                    handleScrollTo(link.link);
                  }}
                >
                  {link.linkName}
                  {hoverIndex === index && <div className="active"></div>}
                </h3>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="tech-decor-container">
        <img src={navDecor} className="tech-decor" />{" "}
        <img src={navDecorLine} className="tech-decor-line" />
        <img src={navDecorLine} className="tech-decor-line-right" />
      </div>
    </nav>
  );
}
