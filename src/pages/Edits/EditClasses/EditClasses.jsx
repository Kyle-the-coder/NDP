import {
  useNavigate,
  useNavigationType,
  useOutletContext,
} from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { db } from "../../../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Card } from "../../../components/Card/Card";
import { IsEditContext } from "../../../contexts/isEditContext";
import { SelectedCardContext } from "../../../contexts/selectedCardContext";
import { scrollToSection } from "../../../components/SmoothScroll";
import arrow from "../../../assets/icons/functIcons/arrow.png";
import gsap from "gsap";
import "./editClasses.css";

export default function EditClasses() {
  const [cardArray, setCardArray] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [classToDelete, setClassToDelete] = useState(null);

  const classesDocRef = doc(db, "ndp", "classes");
  const navigate = useNavigate();

  //Card States and functionality
  const { selectedId, setSelectedId } = useContext(SelectedCardContext);
  const wrapperRef = useRef(null);
  const isEdit = useContext(IsEditContext);
  const { backState } = useOutletContext();
  const navigationType = useNavigationType();

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
    <section className="edit-classes-main" ref={wrapperRef}>
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
            key={info.id}
            isClass={info.class}
            id={info.id}
            title={info.title}
            blerb={info.blerb}
            link={info.link}
            pointer
            isEdit
            onNav={handlePageLeave}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            editor={isEdit}
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
