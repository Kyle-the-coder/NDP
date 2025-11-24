import "./createclass.css";
import createClassBg from "../../../assets/decor/imgs/NDPAboutBg.png";
import add from "../../../assets/icons/functIcons/new.png";
import arrow from "../../../assets/icons/functIcons/arrow.png";
import { Button } from "../../../components/Button/Button";
import { Loader } from "../../../components/Loader/Loader";
import { useContext, useEffect, useRef, useState } from "react";
import { db } from "../../../firebaseConfig";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { Card } from "../../../components/Card/Card";
import {
  useNavigate,
  useNavigationType,
  useOutletContext,
} from "react-router-dom";
import { format, parseISO } from "date-fns";
import { SelectedCardContext } from "../../../contexts/selectedCardContext";
import gsap from "gsap";
import { scrollToSection } from "../../../components/SmoothScroll";
import { IsEditContext } from "../../../contexts/isEditContext";

export default function CreateClass() {
  const [classTitle, setClassTitle] = useState("");
  const [classDescription, setClassDescription] = useState("");
  const [classStartAge, setClassStartAge] = useState("");
  const [classEndAge, setClassEndAge] = useState("");
  const [classPrice, setClassPrice] = useState("");
  const [classPriceParam, setClassPriceParam] = useState("");
  const [classStartDate, setClassStartDate] = useState("");
  const [classEndDate, setClassEndDate] = useState("");
  const [classLink, setClassLink] = useState("");

  // Styles and Functionality for cards
  const { selectedId, setSelectedId } = useContext(SelectedCardContext);
  const wrapperRef = useRef(null);
  const isEdit = useContext(IsEditContext);
  const { backState } = useOutletContext();
  const navigationType = useNavigationType();
  // New states for the added fields
  const [style, setStyle] = useState("");
  const [level, setLevel] = useState("");
  const [active, setActive] = useState(true);
  const [ageGroup, setAgeGroup] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cardArray, setCardArray] = useState([]);
  const navigate = useNavigate();

  // Reference to the single document /ndp/classes
  const classesDocRef = doc(db, "ndp", "classes");

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

  // Hide wrapper on mount
  useEffect(() => {
    if (wrapperRef.current) {
      gsap.set(wrapperRef.current, { opacity: 0 });
    }
  }, []);

  useEffect(() => {
    // Must wait for data AND wrapperRef
    if (!wrapperRef.current) return;

    // If navigating normally (not back), just fade in normally
    if (!backState?.fromBack || navigationType === "POP") {
      gsap.to(wrapperRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      });
      return;
    }

    // If coming from BACK navigation...
    if (cardArray.length === 0) return; // wait for data

    const targetId = backState.targetId;
    const el = document.getElementById(targetId);

    if (!el) {
      // No specific target — just fade in
      gsap.to(wrapperRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      });
      return;
    }

    // Scroll instantly (wrapper still hidden)
    el.scrollIntoView({ behavior: "instant", block: "center" });

    // Fade in page wrapper
    gsap.to(wrapperRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });

    // Animate the target card separately
    gsap.fromTo(
      el,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );

    // Clear state so refresh doesn’t repeat animation
    navigate(window.location.pathname, { replace: true, state: {} });
  }, [backState, navigationType, cardArray, navigate]);

  // FETCH existing classes from the allClasses array in the document
  useEffect(() => {
    async function fetchClasses() {
      try {
        const docSnap = await getDoc(classesDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const classesData = (data.allClasses || []).map((cls, idx) => {
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
    fetchClasses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const docSnap = await getDoc(classesDocRef);
      let currentClasses = [];
      if (docSnap.exists()) {
        const data = docSnap.data();
        currentClasses = data.allClasses || [];
      }

      const newClass = {
        id: Date.now().toString(), // unique ID based on timestamp
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
        classLink: classLink,
        createdAt: new Date().toISOString(),
      };

      const updatedClasses = [newClass, ...currentClasses];

      await updateDoc(classesDocRef, {
        allClasses: updatedClasses,
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
      setClassTitle("");
      setClassDescription("");
      setClassStartAge("");
      setClassEndAge("");
      setClassPrice("");
      setClassPriceParam("");
      setClassStartDate("");
      setClassEndDate("");
      setStyle("");
      setLevel("");
      setActive(false);
      setAgeGroup("");
      setClassLink("");

      setSuccess(true);
    } catch (err) {
      console.error("Error adding class: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="create-class-main" ref={wrapperRef}>
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
      <img className="create-class-bg" src={createClassBg} />
      <div className="create-class-title">
        <h1 className="bebas-font">Add A Class</h1>
      </div>

      <div className="create-class-form-display-container">
        <div className="create-class-form-container">
          <form className="create-class-form" onSubmit={handleSubmit}>
            <div className="class-form-img-container">
              <img src={add} className="class-form-img" />
            </div>

            <div className="form-title">
              <h1 className="bebas-font">Create a Class</h1>
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
                value={classTitle}
                onChange={(e) => {
                  setClassTitle(e.target.value);
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
                value={classDescription}
                onChange={(e) => setClassDescription(e.target.value)}
                required
              />
            </div>

            <div className="input-container">
              <label className="urban-font label">Price</label>
              <input
                type="number"
                placeholder="100"
                className="input urban-thin-font"
                value={classPrice}
                onChange={(e) => setClassPrice(e.target.value)}
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
                    checked={classPriceParam === "per Month"}
                    onChange={(e) => setClassPriceParam(e.target.value)}
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
                    checked={classPriceParam === "per Session"}
                    onChange={(e) => setClassPriceParam(e.target.value)}
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
                value={classLink}
                onChange={(e) => {
                  setClassLink(e.target.value);
                  setSuccess(false);
                }}
                required
              />
            </div>

            {loading ? <Loader /> : <Button text="Submit" />}
          </form>
        </div>

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
            <p className="uban-thin-font">
              {" "}
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
          <div className="create-class-grid">
            {cardArray.map((info, index) => (
              <Card
                isClass={info.class}
                key={index}
                title={info.title}
                blerb={info.blerb}
                link={info.link}
                id={info.id}
                onNav={handlePageLeave}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
