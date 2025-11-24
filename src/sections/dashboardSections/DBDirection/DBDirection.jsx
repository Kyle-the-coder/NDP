import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { Button } from "../../../components/Button/Button";
import { useRef } from "react";
import { scrollToSection } from "../../../components/SmoothScroll";
import add from "../../../assets/icons/functIcons/add.png";
import edit from "../../../assets/icons/functIcons/edit.png";
import img from "../../../assets/icons/functIcons/img.png";
import dance from "../../../assets/icons/functIcons/free-style.png";
import gsap from "gsap";
import "./dbdirection.css";

export function DBDirection({ wrapperRef }) {
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <section
      style={{ padding: "40px 20px", gap: "50px" }}
      className="display-column z-index"
    >
      <div
        className="db-direction-container "
        onClick={(e) => {
          e.preventDefault();
          handlePageLeave(() => {
            navigate("/createClass", {
              state: { fromBack: false, targetId: null },
            });
            window.scrollTo(0, 0);
          });
        }}
      >
        <h1 className="urban-thin-font letter-space">
          <strong className="yellow-text">Create</strong> a Class
        </h1>
        <img src={add} />
      </div>
      <div
        className="db-direction-container "
        onClick={(e) => {
          e.preventDefault();
          handlePageLeave(() => {
            navigate("/editClasses", {
              state: { fromBack: false, targetId: null },
            });
            window.scrollTo(0, 0);
          });
        }}
      >
        <h1 className="urban-thin-font letter-space">
          <span className="yellow-text">Edit</span> Class
        </h1>
        <img src={edit} />
      </div>{" "}
      <div
        className="db-direction-container "
        onClick={(e) => {
          e.preventDefault();
          handlePageLeave(() => {
            navigate("/createStyle", {
              state: { fromBack: false, targetId: null },
            });
            window.scrollTo(0, 0);
          });
        }}
      >
        <h1 className="urban-thin-font letter-space">
          <strong className="purple-text">Create</strong> a Style
        </h1>
        <img src={dance} />
      </div>
      <div
        className="db-direction-container "
        onClick={(e) => {
          e.preventDefault();
          navigate("/editStyles", {
            state: { fromBack: false, targetId: null },
          });
          window.scrollTo(0, 0);
        }}
      >
        <h1 className="urban-thin-font letter-space">
          <span className="purple-text">Edit</span> Style
        </h1>
        <img src={dance} />
      </div>
      <div
        className="db-direction-container "
        onClick={(e) => {
          e.preventDefault();
          navigate("/editImg", {
            state: { fromBack: false, targetId: null },
          });
          window.scrollTo(0, 0);
        }}
      >
        <h1 className="urban-thin-font letter-space">
          <strong className="blue-text">Edit</strong> Landing Page Video
        </h1>
        <img src={img} />
      </div>
      <Button
        text="Logout"
        onClick={() => {
          handleLogout();
          window.scrollTo(0, 0);
        }}
      >
        Logout
      </Button>
    </section>
  );
}
