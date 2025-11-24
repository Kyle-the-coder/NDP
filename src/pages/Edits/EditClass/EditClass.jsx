import { Button } from "../../../components/Button/Button";
import { Loader } from "../../../components/Loader/Loader";
import { useContext, useEffect, useRef, useState } from "react";
import { db } from "../../../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Card } from "../../../components/Card/Card";
import { useNavigate, useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { SelectedCardContext } from "../../../contexts/selectedCardContext";
import { scrollToSection } from "../../../components/SmoothScroll";
import createClassBg from "../../../assets/decor/imgs/NDPAboutBg.png";
import edit from "../../../assets/icons/functIcons/edit.png";
import arrow from "../../../assets/icons/functIcons/arrow.png";
import gsap from "gsap";
import { IsEditContext } from "../../../contexts/isEditContext";
import "./editclass.css";
import SingleClass from "../../Display/SingleClass/SingleClass";

export default function EditClass() {
  // -------- ROUTER PARAM --------
  const { id } = useParams();

  // -------- FORM STATE --------
  const [classTitle, setClassTitle] = useState("");
  const [classDescription, setClassDescription] = useState("");
  const [classStartAge, setClassStartAge] = useState("");
  const [classEndAge, setClassEndAge] = useState("");
  const [classPrice, setClassPrice] = useState("");
  const [classPriceParam, setClassPriceParam] = useState("");
  const [classStartDate, setClassStartDate] = useState("");
  const [classEndDate, setClassEndDate] = useState("");
  const [classLink, setClassLink] = useState("");

  const [style, setStyle] = useState("");
  const [level, setLevel] = useState("");
  const [active, setActive] = useState(true);
  const [ageGroup, setAgeGroup] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // NEW: loading states
  const [singleClassLoaded, setSingleClassLoaded] = useState(false);
  const [pageReady, setPageReady] = useState(false);

  // -------- CONTEXT --------
  const { selectedId, setSelectedId } = useContext(SelectedCardContext);
  const { isEdit, setIsEdit } = useContext(IsEditContext);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const classesDocRef = doc(db, "ndp", "classes");

  useEffect(() => {
    setIsEdit("/editClasses");
  }, []);

  const handleBack = () => {
    isEdit === "/editClasses"
      ? navigate("/editClasses", { state: { fromBack: true, targetId: id } })
      : navigate("/dashboard", { state: { fromBack: true, targetId: id } });
  };

  // -------- LOAD CLASS TO EDIT --------
  useEffect(() => {
    async function fetchClassToEdit() {
      try {
        const snap = await getDoc(classesDocRef);
        if (!snap.exists()) return;

        const all = snap.data().allClasses || [];
        const found = all.find((cls) => cls.id === id);
        if (!found) return;

        // PREPOPULATE FORM FIELDS
        setClassTitle(found.title || "");
        setClassDescription(found.description || "");
        setClassStartAge(found.startAge || "");
        setClassEndAge(found.endAge || "");
        setClassPrice(found.price || "");
        setClassPriceParam(found.priceParam || "");
        setClassStartDate(found.startDate || "");
        setClassEndDate(found.endDate || "");
        setStyle(found.style || "");
        setLevel(found.level || "");
        setActive(found.active ?? true);
        setAgeGroup(found.ageGroup || "");
        setClassLink(found.classLink || "");
      } catch (err) {
        console.error("Error loading class:", err);
      } finally {
        setSingleClassLoaded(true);
      }
    }

    fetchClassToEdit();
  }, [id]);

  // -------- FADE IN WHEN EVERYTHING IS LOADED --------
  useEffect(() => {
    if (singleClassLoaded && wrapperRef.current) {
      gsap.to(wrapperRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      });
      setPageReady(true);
    }
  }, [singleClassLoaded]);

  // -------- UPDATE CLASS --------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const snap = await getDoc(classesDocRef);
      if (!snap.exists()) return;

      const all = snap.data().allClasses || [];

      const updatedClasses = all.map((cls) => {
        if (cls.id !== id) return cls;

        return {
          ...cls,
          title: classTitle,
          description: classDescription,
          startAge: classStartAge,
          endAge: classEndAge,
          price: Number(classPrice),
          priceParam: classPriceParam,
          startDate: classStartDate,
          endDate: classEndDate,
          style,
          level,
          active,
          ageGroup,
          classLink,
          updatedAt: new Date().toISOString(),
        };
      });

      await updateDoc(classesDocRef, { allClasses: updatedClasses });
      setSuccess(true);
    } catch (err) {
      console.error("Error updating class: ", err);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------------------------------
  // ---------------------- JSX --------------------------
  // -----------------------------------------------------

  return (
    <section
      className="create-class-main"
      ref={wrapperRef}
      style={{ opacity: 0 }} // <-- START HIDDEN
    >
      <div className="back-arrow-container">
        <img
          src={arrow}
          className="back-arrow"
          onClick={() => {
            handleBack();
          }}
        />
      </div>

      <img className="create-class-bg" src={createClassBg} />

      <div className="create-class-title">
        <h1 className="bebas-font">Edit {classTitle}</h1>
      </div>

      <div className="create-class-form-display-container">
        {/* ------------- FORM ------------- */}
        <div className="create-class-form-container">
          <form className="create-class-form" onSubmit={handleSubmit}>
            <div className="class-form-img-container">
              <img src={edit} className="class-form-img" />
            </div>

            <div className="form-title">
              <h1 className="bebas-font">Edit Class</h1>
            </div>

            {success && (
              <p
                style={{
                  color: "green",
                  fontWeight: "bold",
                  marginBottom: "1rem",
                }}
              >
                ✅ Class updated successfully!
              </p>
            )}

            {/* -------- TITLE -------- */}
            <div className="input-container">
              <label className="urban-font label">Class Title</label>
              <input
                type="text"
                className="input urban-thin-font"
                value={classTitle}
                onChange={(e) => {
                  setClassTitle(e.target.value);
                  setSuccess(false);
                }}
                required
              />
            </div>

            {/* -------- DESCRIPTION -------- */}
            <div className="input-container">
              <label className="urban-font label">Description</label>
              <textarea
                rows={10}
                className="input urban-thin-font"
                value={classDescription}
                onChange={(e) => setClassDescription(e.target.value)}
                required
              />
            </div>

            {/* -------- PRICE -------- */}
            <div className="input-container">
              <label className="urban-font label">Price</label>
              <input
                type="number"
                className="input urban-thin-font"
                value={classPrice}
                onChange={(e) => setClassPrice(e.target.value)}
                required
              />

              <div
                style={{ marginTop: "0.5rem", display: "flex", gap: "1rem" }}
              >
                <label className="urban-thin-font">
                  <input
                    type="radio"
                    name="priceType"
                    value="per Month"
                    checked={classPriceParam === "per Month"}
                    onChange={(e) => setClassPriceParam(e.target.value)}
                    required
                  />
                  Per Month
                </label>

                <label className="urban-thin-font">
                  <input
                    type="radio"
                    name="priceType"
                    value="per Session"
                    checked={classPriceParam === "per Session"}
                    onChange={(e) => setClassPriceParam(e.target.value)}
                    required
                  />
                  Per Session
                </label>
              </div>
            </div>

            {/* -------- AGES -------- */}
            <div className="input-container">
              <label className="urban-font label">Ages</label>
              <div style={{ display: "flex", gap: "1rem" }}>
                <div>
                  <label className="urban-thin-font">Start Age</label>
                  <input
                    type="number"
                    className="input urban-thin-font"
                    value={classStartAge}
                    onChange={(e) => setClassStartAge(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="urban-thin-font">End Age</label>
                  <input
                    type="number"
                    className="input urban-thin-font"
                    value={classEndAge}
                    onChange={(e) => setClassEndAge(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* -------- SESSION DATES -------- */}
            <div className="input-container">
              <label className="urban-font label">Session Dates</label>
              <div style={{ display: "flex", gap: "1rem" }}>
                <div>
                  <label className="urban-thin-font">Start Date</label>
                  <input
                    type="date"
                    className="input urban-thin-font"
                    value={classStartDate}
                    onChange={(e) => setClassStartDate(e.target.value)}
                    disabled={classPriceParam === "per Month"}
                    required={classPriceParam !== "per Month"}
                  />
                </div>
                <div>
                  <label className="urban-thin-font">End Date</label>
                  <input
                    type="date"
                    className="input urban-thin-font"
                    value={classEndDate}
                    onChange={(e) => setClassEndDate(e.target.value)}
                    disabled={classPriceParam === "per Month"}
                    required={classPriceParam !== "per Month"}
                  />
                </div>
              </div>
            </div>

            {/* -------- STYLE -------- */}
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

            {/* -------- LEVEL -------- */}
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

            {/* -------- ACTIVE -------- */}
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

            {/* -------- AGE GROUP -------- */}
            <div className="input-container">
              <label className="urban-font label">Age Group</label>
              <select
                className="input urban-thin-font"
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select an age group
                </option>
                <option value="Kids">Kids</option>
                <option value="Teens">Teens</option>
                <option value="Adults">Adults</option>
              </select>
            </div>

            {/* -------- LINK -------- */}
            <div className="input-container">
              <label className="urban-font label">Class Sign Up Link</label>
              <input
                type="text"
                className="input urban-thin-font"
                value={classLink}
                onChange={(e) => {
                  setClassLink(e.target.value);
                  setSuccess(false);
                }}
                required
              />
            </div>

            {/* -------- SUBMIT -------- */}
            {loading ? <Loader /> : <Button text="Save Changes" />}
          </form>
        </div>

        {/* ------------- PREVIEW & CURRENT CLASSES ------------- */}
        <div className="create-class-display-container">
          <div className="create-class-display">
            <h1 className="bebas-font blue-text">{classTitle || "Title"}</h1>
            <p className="urban-thin-font">
              {classDescription || "Description"}
            </p>
            <p className="urban-thin-font">
              {classPrice
                ? `$${classPrice} ${classPriceParam || ""}`
                : "Price Per Session"}
            </p>

            <p className="urban-thin-font">
              <b className="urban-font blue-text">Session:</b>{" "}
              {classPriceParam === "per Month"
                ? "Monthly"
                : classStartDate && classEndDate
                ? `${format(
                    parseISO(classStartDate),
                    "MMM d, yyyy"
                  )} - ${format(parseISO(classEndDate), "MMM d, yyyy")}`
                : "Start Date - End Date"}
            </p>

            <p className="urban-thin-font">
              <b className="urban-font blue-text">Style:</b> {style || "--"}
            </p>
            <p className="urban-thin-font">
              <b className="urban-font blue-text">Level:</b> {level || "--"}
            </p>
            <p className="urban-thin-font">
              <b className="urban-font blue-text">Active:</b>{" "}
              {active ? "Yes" : "No"}
            </p>
            <p className="urban-thin-font">
              <b className="urban-font blue-text">Age Group:</b>{" "}
              {ageGroup || "--"}
            </p>
          </div>

          <h1 className="urban-thin-font yellow-text size underline">
            Page Preview:
          </h1>

          <div className="display-column">
            <SingleClass
              isDisplay={true}
              dStartAge={classStartAge}
              dEndAge={classEndAge}
              dTitle={classTitle}
              dBlerb={classDescription}
              dStyle={style}
              dLevel={level}
              dPrice={classPrice}
              dPriceParam={classPriceParam}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
