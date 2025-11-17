import createClassBg from "../../../assets/decor/imgs/NDPAboutBg.png";
import add from "../../../assets/icons/functIcons/free-style.png";
import arrow from "../../../assets/icons/functIcons/arrow.png";
import { Button } from "../../../components/Button/Button";
import { Loader } from "../../../components/Loader/Loader";
import { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { Card } from "../../../components/Card/Card";
import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";
import "./editstyles.css";

export default function EditStyles() {
  const [style, setStyle] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [description, setDescription] = useState("");


  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cardArray, setCardArray] = useState([]);
  const navigate = useNavigate();

  // Reference to the single document /ndp/classes
  const DocRef = doc(db, "ndp", "danceStyles");

  // Load existing classes from the allStyles array in the document
  useEffect(() => {
    async function fetchStyles() {
      try {
        const docSnap = await getDoc(DocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const classesData = (data.allStyles || []).map((cls, idx) => {
            const desc = cls.description || "";
            return {
              id: cls.id || idx.toString(),
              class: true,
              title: cls.title,
              blerb:
                desc.split(" ").length > 17
                  ? desc.split(" ").slice(0, 17).join(" ") + "..."
                  : desc,
              link: cls.link || "",
            };
          });
          setCardArray(classesData);
        } else {
          setCardArray([]);
        }
      } catch (err) {
        console.error("Error fetching classes: ", err);
      }
    }
    fetchStyles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const docSnap = await getDoc(DocRef);
      let currentStyles = [];
      if (docSnap.exists()) {
        const data = docSnap.data();
        currentStyles = data.allStyles || [];
      }

      const newStyle = {
        id: Date.now().toString(), // unique ID based on timestamp
        style: style,
        description: description,
        videoLink: videoLink,
       
        createdAt: new Date().toISOString(),
      };

      const updatedClasses = [newClass, ...currentStyles];

      await updateDoc(DocRef, {
        allStyles: updatedClasses,
      });

      // Update local UI state
      const classesData = updatedClasses.map((cls, idx) => {
        const desc = cls.description || "";
        return {
          id: cls.id || idx.toString(),
          class: true,
          title: cls.title,
          blerb:
            desc.split(" ").length > 17
              ? desc.split(" ").slice(0, 17).join(" ") + "..."
              : desc,
          link: cls.link || "",
        };
      });
      setCardArray(classesData);

      // Reset form fields including new ones
      setStyle("");
      setVideoLink("");
      setDescription("");
      ("");
      ("");
      ("");
      setClassStartDate("");
      setClassEndDate("");
      setStyle("");
      setLevel("");
      setActive(false);
      setAgeGroup("");
      ("");

      setSuccess(true);
    } catch (err) {
      console.error("Error adding class: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="edit-styles-main">
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
      <div className="edit-styles-title">
        <h1 className="bebas-font">Edit Styles</h1>
      </div>

      <div className="edit-styles-form-display-container">
        <div className="edit-styles-form-container">
          <form className="edit-styles-form" onSubmit={handleSubmit}>
            <div className="styles-form-img-container">
              <img src={add} className="styles-form-img" />
            </div>

            <div className="form-title">
              <h1 className="bebas-font">Edit Style</h1>
            </div>

            {success && (
              <p
                style={{
                  color: "green",
                  fontWeight: "bold",
                  marginBottom: "1rem",
                }}
              >
                ✅ Class added successfully!
              </p>
            )}

            <div className="input-container">
              <label className="urban-font label">Class Title</label>
              <input
                type="text"
                placeholder="Enter Class Title"
                className="input urban-thin-font"
                value={style}
                onChange={(e) => {
                  setStyle(e.target.value);
                  setSuccess(false);
                }}
                required
              />
            </div>

            <div className="input-container">
              <label className="urban-font label">Description</label>
              <textarea
                rows={10}
                placeholder="Enter Description"
                className="input urban-thin-font"
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
                required
              />
            </div>

            <div className="input-container">
              <label className="urban-font label">Price</label>
              <input
                type="number"
                placeholder="100"
                className="input urban-thin-font"
                value={}
                onChange={(e) => (e.target.value)}
                required
              />

              <div
                style={{
                  marginTop: "0.5rem",
                  display: "flex",
                  gap: "1rem",
                }}
              >
                <label className="urban-thin-font">
                  <input
                    type="radio"
                    name="priceType"
                    value="per Month"
                    checked={ === "per Month"}
                    onChange={(e) => (e.target.value)}
                    style={{ marginRight: "0.3rem" }}
                    required
                  />
                  Per Month
                </label>

                <label className="urban-thin-font">
                  <input
                    type="radio"
                    name="priceType"
                    value="per Session"
                    checked={ === "per Session"}
                    onChange={(e) => (e.target.value)}
                    style={{ marginRight: "0.3rem" }}
                    required
                  />
                  Per Session
                </label>
              </div>
            </div>

            <div className="input-container">
              <label className="urban-font label">Ages</label>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  padding: "5px 0px",
                }}
              >
                <div>
                  <label className="urban-thin-font">Start Age</label>
                  <input
                    type="number"
                    className="input urban-thin-font"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="urban-thin-font">End Age</label>
                  <input
                    type="number"
                    className="input urban-thin-font"
                    value={}
                    onChange={(e) => (e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="input-container">
              <label className="urban-font label">Session Dates</label>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  padding: "5px 0px",
                }}
              >
                <div>
                  <label className="urban-thin-font">Start Date</label>
                  <input
                    type="date"
                    className="input urban-thin-font"
                    value={}
                   onChange={(e) => setClassStartDate(e.target.value)}                   disabled={ === "per Month"}
                    required={ !== "per Month"}
                  />
                </div>
                <div>
                  <label className="urban-thin-font">End Date</label>
                  <input
                    type="date"
                    className="input urban-thin-font"
                    value={classEndDate}
                    onChange={(e) => setClassEndDate(e.target.value)}
                    disabled={ === "per Month"}
                    required={ !== "per Month"}
                  />
                </div>
              </div>
            </div>

            {/* New fields */}

            <div className="input-container">
              <label className="urban-font label">Style</label>
              <select
                className="input urban-thin-font"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select a style
                </option>
                <option value="Hip Hop">Hip Hop</option>
                <option value="Popping">Popping</option>
                <option value="Tutting">Tutting</option>
                <option value="Waving">Waving</option>
                <option value="Freestyle">Freestyle</option>
                <option value="All Styles">All Styles Offered</option>
              </select>
            </div>

            <div className="input-container">
              <label className="urban-font label">Level</label>
              <select
                className="input urban-thin-font"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select a level
                </option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div
              className="input-container"
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <input
                type="checkbox"
                id="active-checkbox"
                checked={active}
                onChange={() => setActive(!active)}
              />
              <label htmlFor="active-checkbox" className="urban-font label">
                Active
              </label>
            </div>

            <div className="input-container">
              <label className="urban-font label">Age Group</label>
              <select
                className="input urban-thin-font"
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select a age group
                </option>
                <option value="Kids">Kids</option>
                <option value="Teens">Teens</option>
                <option value="Adults">Adults</option>
              </select>
            </div>

            <div className="input-container">
              <label className="urban-font label">Class Sign Up Link</label>
              <input
                type="text"
                placeholder="Enter Class Link"
                className="input urban-thin-font"
                value={}
                onChange={(e) => {
                  (e.target.value);
                  setSuccess(false);
                }}
                required
              />
            </div>

            {loading ? <Loader /> : <Button text="Submit" />}
          </form>
        </div>

        <div className="edit-styles-display-container">
          <div className="edit-styles-display">
            <h1 className="bebas-font blue-text">{style || "Title"}</h1>
            <p className="urban-thin-font">{videoLink || "Description"}</p>
            <p className="urban-thin-font">
              {
                ? `$${} ${ || ""}`
                : "Price Per Session"}
            </p>
            <p className="uban-thin-font">
              {" "}
              <b className="urban-font blue-text">Session:</b>{" "}
              { === "per Month"
                ? "Monthly"
                :  & classEndDate
                ? `{(
                    parseISO(),                    "MMM d, yyyy"
                  )} - ${((classEndDate), "MMM d, yyyy")}`
                : "Start Date - End Date"}
            </p>

            <p className="urban-thin-font">
              <b className="urban-font blue-text">Style:</b>{" "}
              {style === "" ? "--" : style}
            </p>
            <p className="urban-thin-font">
              <b className="urban-font blue-text">Level:</b>{" "}
              {level === "" ? "--" : level}
            </p>
            <p className="urban-thin-font">
              <b className="urban-font blue-text">Active:</b>{" "}
              {active ? (active ? "Yes" : "No") : "--"}
            </p>
            <p className="urban-thin-font">
              <b className="urban-font blue-text">Age Group:</b>{" "}
              {ageGroup === "" ? "--" : ageGroup}
            </p>
          </div>

          <h1 className="anton-font blue-text size">Current Classes</h1>
          <div className="edit-styles-grid">
            {cardArray.map((info, index) => (
              <Card
                isClass={info.class}
                key={index}
                title={info.title}
                blerb={info.blerb}
                link={info.link}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
