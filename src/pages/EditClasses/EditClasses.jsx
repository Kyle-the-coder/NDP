import editBg from "../../assets/decor/imgs/NDPAboutBg.png";
import arrow from "../../assets/icons/functIcons/arrow.png";
import "./editClasses.css";

export default function EditClasses() {
  return (
    <section className="edit-classes-main">
      <img src={editBg} className="edit-bg" />
      <div className="back-arrow-container">
        <img
          src={arrow}
          className="back-arrow"
          onClick={() => {
            navigate("/dashboard");
            window.scrollTo(0, 0);
          }}
        />
      </div>
      <div className="edit-class-title">
        <h1 className="bebas-font">Edit A Class</h1>
      </div>
    </section>
  );
}
