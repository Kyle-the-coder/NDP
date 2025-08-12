import { useEffect, useState } from "react";
import editBg from "../../assets/decor/imgs/NDPAboutBg.png";
import arrow from "../../assets/icons/functIcons/arrow.png";

import { db } from "../../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "./editClasses.css";
import { Card } from "../../components/Card/Card";
import { useNavigate } from "react-router-dom";

export default function EditClasses() {
  const [cardArray, setCardArray] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [classToDelete, setClassToDelete] = useState(null);

  const classesDocRef = doc(db, "ndp", "classes");
  const navigate = useNavigate();

  useEffect(() => {
    fetchClasses();
  }, []);

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

  async function deleteClassById(classId) {
    try {
      const docSnap = await getDoc(classesDocRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const updatedClasses = (data.allClasses || []).filter(
          (cls) => cls.id !== classId
        );

        await updateDoc(classesDocRef, { allClasses: updatedClasses });
        setCardArray((prev) => prev.filter((cls) => cls.id !== classId));
      }
      setShowConfirm(false);
      setClassToDelete(null);
    } catch (err) {
      console.error("Error deleting class:", err);
    }
  }

  function handleDeleteClick(classItem) {
    setClassToDelete(classItem);
    setShowConfirm(true);
  }

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
        <p className="urban-thin-font">Click on a class to edit</p>
      </div>
      <div className="edit-class-grid">
        {cardArray.map((info) => (
          <Card
            isClass={info.class}
            key={info.id}
            title={info.title}
            blerb={info.blerb}
            link={info.link}
            pointer
            isEdit
            onDelete={() => handleDeleteClick(info)}
          />
        ))}
      </div>

      {showConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <h2 className="bebas-font">Are you sure?</h2>
            <p className="urban-thin-font">
              You are about to delete{" "}
              <strong className="blue-text">{classToDelete.title}</strong>.
            </p>
            <div className="confirm-buttons">
              <button
                className="btn-cancel"
                onClick={() => {
                  setShowConfirm(false);
                  setClassToDelete(null);
                }}
              >
                Cancel
              </button>
              <button
                className="btn-delete"
                onClick={() => deleteClassById(classToDelete.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
