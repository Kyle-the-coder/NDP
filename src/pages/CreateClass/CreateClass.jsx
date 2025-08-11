import "./createclass.css";
import createClassBg from "../../assets/decor/imgs/NDPAboutBg.png";
import add from "../../assets/icons/functIcons/new.png";
import arrow from "../../assets/icons/functIcons/arrow.png";
import { Button } from "../../components/Button/Button";
import { Loader } from "../../components/Loader/Loader";
import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { Card } from "../../components/Card/Card";
import { useNavigate } from "react-router-dom";

export default function CreateClass() {
  const [classTitle, setClassTitle] = useState("");
  const [classDescription, setClassDescription] = useState("");
  const [classStartAge, setClassStartAge] = useState("");
  const [classEndAge, setClassEndAge] = useState("");

  const [classPrice, setClassPrice] = useState("");
  const [classPriceParam, setClassPriceParam] = useState("");
  const [classStartDate, setClassStartDate] = useState("");
  const [classEndDate, setClassEndDate] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cardArray, setCardArray] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "classes"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const classesData = snapshot.docs.map((doc) => {
        const desc = doc.data().description || "";
        return {
          id: doc.id,
          class: true, // to match your Card props
          title: doc.data().title,
          blerb:
            desc.split(" ").length > 17
              ? desc.split(" ").slice(0, 17).join(" ") + "..."
              : desc,
          link: "", // or doc.data().link if you add one
        };
      });
      setCardArray(classesData);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      await addDoc(collection(db, "classes"), {
        title: classTitle,
        description: classDescription,
        startAge: classStartAge,
        endAge: classEndAge,
        price: Number(classPrice),
        priceParam: classPriceParam,
        startDate: classStartDate,
        endDate: classEndDate,
        createdAt: serverTimestamp(),
      });

      // Reset form
      setClassTitle("");
      setClassDescription("");
      setClassStartAge("");
      setClassEndAge("");
      setClassPrice("");
      setClassPriceParam("");
      setClassStartDate("");
      setClassEndDate("");

      setSuccess(true);
    } catch (err) {
      console.error("Error adding class: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="create-class-main">
      <img
        src={arrow}
        className="back-arrow"
        onClick={() => {
          navigate("/dashboard"), window.scrollTo(0, 0);
        }}
      />
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
                  />
                </div>
                <div>
                  <label className="urban-thin-font">End Age</label>
                  <input
                    type="number"
                    className="input urban-thin-font"
                    value={classEndAge}
                    onChange={(e) => setClassEndAge(e.target.value)}
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
                    disabled={classPriceParam === "per Month" && true}
                  />
                </div>
                <div>
                  <label className="urban-thin-font">End Date</label>
                  <input
                    type="date"
                    className="input urban-thin-font"
                    value={classEndDate}
                    onChange={(e) => setClassEndDate(e.target.value)}
                    disabled={classPriceParam === "per Month" && true}
                  />
                </div>
              </div>
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
            <p className="uban-thin-font blue-text">Session Dates:</p>
            <p className="urban-thin-font">
              {classPriceParam === "per Month"
                ? "Monthly"
                : classStartDate && classEndDate
                ? `${classStartDate} - ${classEndDate}`
                : "Start Date - End Date"}
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
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
