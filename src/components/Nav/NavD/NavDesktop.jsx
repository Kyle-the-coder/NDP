// components/Nav/NavDesktop.jsx
import fb from "../../../assets/icons/functIcons/facebook-logo.png";
import insta from "../../../assets/icons/functIcons/instagram.png";
import logo from "../../../assets/logo/NBDLogo.png";
import lineDecor from "../../../assets/decor/imgs/spaceDecor.webp";
import "../nav.css";

export function NavDesktop({
  links,
  hoverIndex,
  handleMouseEnter,
  handleMouseLeave,
  handleScrollTo,
  navigate,
}) {
  return (
    <>
      <div className="logo-links">
        <img
          src={logo}
          onClick={() => {
            navigate("/");
            handleMouseEnter(0);
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
              <h1 className="bebas-thin-font letter-space">{link.linkName}</h1>

              {hoverIndex === index && <div className="active"></div>}
            </div>
          ))}
        </div>
        <div className="shine"></div>
      </div>

      <div className="socials">
        <img src={fb} />
        <img src={insta} />
      </div>

      <img src={lineDecor} className="space-decor left" />
      <img src={lineDecor} className="space-decor right roto" />
    </>
  );
}
