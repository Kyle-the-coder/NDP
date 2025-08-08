import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { Button } from "../../../components/Button/Button";
import add from "../../../assets/icons/functIcons/add.png";
import edit from "../../../assets/icons/functIcons/edit.png";
import img from "../../../assets/icons/functIcons/img.png";
import "./dbdirection.css";

export function DBDirection() {
  const navigate = useNavigate();

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
          navigate("/createClass");
          window.scrollTo(0, 0);
        }}
      >
        <h1 className="outfit-font">Create a Class</h1>
        <img src={add} />
      </div>
      <div
        className="db-direction-container "
        onClick={(e) => {
          e.preventDefault();
          navigate("/editClass");
          window.scrollTo(0, 0);
        }}
      >
        <h1 className="outfit-font">Edit Your Classes</h1>
        <img src={edit} />
      </div>
      <div
        className="db-direction-container "
        onClick={(e) => {
          e.preventDefault();
          navigate("/editImg");
          window.scrollTo(0, 0);
        }}
      >
        <h1 className="outfit-font">Edit Videos</h1>
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
