import "./createclass.css";
import createClassBg from "../../assets/decor/imgs/NDPAboutBg.png";
import add from "../../assets/icons/functIcons/new.png";
import { Button } from "../../components/Button/Button";

export default function CreateClass() {
  return (
    <section className="create-class-main">
      <img className="create-class-bg" src={createClassBg} />
      <div className="create-class-title">
        <h1 className="bebas-font">Add A Class</h1>
      </div>

      <div className="create-class-form-display-container">
        <div className="create-class-form-container">
          <form className="create-class-form">
            <div className="class-form-img-container">
              <img src={add} className="class-form-img" />
            </div>

            <div className="form-title">
              <h1 className="bebas-font">Create a Class</h1>
            </div>

            <div className="input-container">
              <label className="urban-font label">Class Title</label>
              <input
                type="text"
                placeholder="Enter Class Title"
                className="input urban-thin-font"
              />
            </div>
            <div className="input-container">
              <label className="urban-font label">Description</label>
              <textarea
                type="text"
                rows={10}
                placeholder="Enter Description"
                className="input urban-thin-font"
              />
            </div>
            <div className="input-container">
              <label className="urban-font label">Price</label>
              <input
                type="number"
                placeholder="100"
                className="input urban-thin-font"
              />
            </div>
            <div className="input-container">
              <label className="urban-font label">Session Dates</label>
              <div style={{ display: "flex", gap: "1rem", padding: "5px 0px" }}>
                <div>
                  <label className="urban-thin-font">Start Date</label>
                  <input
                    type="date"
                    placeholder="Start Date"
                    className="input urban-thin-font"
                  />
                </div>
                <div>
                  <label className="urban-thin-font">End Date</label>
                  <input
                    type="date"
                    placeholder="End Date"
                    className="input urban-thin-font"
                  />
                </div>
              </div>
            </div>

            <Button text="Submit" />
          </form>
        </div>
        <div className="create-class-display-container"></div>
      </div>
    </section>
  );
}
