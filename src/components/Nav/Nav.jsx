import { useEffect, useState, useCallback, useRef } from "react";
// import { collection, getDocs } from "firebase/firestore";
import { scrollToSection } from "../SmoothScroll";
import { useNavigate } from "react-router-dom";
import { Hamburger } from "../Hamburger/Hamburger";
// import { db } from "../../firebaseConfig";
import logo from "../../assets/logo/NBDLogo.png";
import fb from "../../assets/icons/functIcons/facebook-logo.png";
import insta from "../../assets/icons/functIcons/instagram.png";
import gsap from "gsap";
import "./nav.css";

export function Nav() {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  //Phone States
  const [isHamburgerActive, setIsHamburgerActive] = useState(null);
  const [isAnimationActive, setIsAnimtionActive] = useState(null);
  const navigate = useNavigate();

  const links = [
    { linkName: "Home", link: "/" },
    { linkName: "About", link: "/about" },
    { linkName: "Classes", link: "/classes" },
    { linkName: "Contact", link: "#footer" },
  ];

  const handleMouseEnter = useCallback((index) => {
    setHoverIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoverIndex(null);
  }, []);

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

  function handleActivateHamburger() {
    if (!isHamburgerActive) {
      setIsHamburgerActive(true);
      setIsAnimtionActive(true);
    } else if (isHamburgerActive) {
      setIsAnimtionActive(false);
      gsap.to(".navbar-phone-dropdown-container", {
        x: "-100%",
        duration: 1.2,
        ease: "power4.in",
        onComplete: () => {
          setIsHamburgerActive(false);
        },
      });
    }
  }

  function handleScrollTo(link) {
    if (isHamburgerActive) {
      if (link === "#footer") {
        handleActivateHamburger();
        setTimeout(() => {
          scrollToSection(link);
        }, 1300);
      } else {
        navigate(link);
        handleActivateHamburger();
      }
    } else {
      if (link === "#footer") {
        scrollToSection(link);
      } else {
        navigate(link);
      }
    }
  }

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
    <nav id="nav" className="nav-main-container charcoal-bg ">
      <div className="nav-overflow-container">
        {windowWidth <= 900 ? (
          <>
            <div className="logo-ham-container">
              <div className="logo">
                <img
                  src={logo}
                  onClick={() => {
                    navigate("/"), setHoverIndex(0);
                  }}
                />
              </div>
              <div
                className="nav-hamburger-container "
                onClick={() => handleActivateHamburger()}
              >
                <Hamburger isOpened={isAnimationActive} />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="logo-links">
              <img
                src={logo}
                onClick={() => {
                  navigate("/"), setHoverIndex(0);
                }}
              />
              <div className="links">
                {links.map((link, index) => (
                  <div
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleScrollTo(link.link)}
                    key={link.linkName}
                    className="link-container"
                  >
                    <h1 className="archivo-font">{link.linkName}</h1>
                    {hoverIndex === index && <div className="active"></div>}
                  </div>
                ))}
              </div>
            </div>

            <div className="socials ">
              <img src={fb} />
              <img src={insta} />
            </div>
          </>
        )}
      </div>
      {isHamburgerActive && (
        <div className="navbar-phone-dropdown-container charcoal-bg">
          <div className="dropdown-links-container">
            {links.map((link, index) => (
              <div key={link.linkName}>
                <h3
                  className="archivo-font dropdown-link-name "
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
    </nav>
  );
}
