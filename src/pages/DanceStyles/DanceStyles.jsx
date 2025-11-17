// SingleClass.jsx
import { useParams } from "react-router-dom";
import { useContext, useMemo, useEffect, useRef } from "react";
import { InfoContext } from "../../contexts/infoContext";
import gsap from "gsap";

import "./singleclass.css";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { Button } from "../../components/Button/Button";

export default function DanceStyle() {
  const { id } = useParams();
  const infoData = useContext(InfoContext);
  const wrapperRef = useRef(null);

  // Compute class data only when context is ready
  const classData = useMemo(() => {
    if (!infoData?.classes?.allClasses) return null;
    return infoData.classes.allClasses.find((c) => c.id === id) || null;
  }, [id, infoData]);

  useEffect(() => {
    if (!classData) return;

    gsap.fromTo(
      wrapperRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: "power2.out" }
    );
  }, [classData]);

  // Context not yet available → show nothing (keeps it invisible)
  if (!infoData || Object.keys(infoData).length === 0) {
    return <section className="single-class-main" style={{ opacity: 0 }} />;
  }

  // Class not found
  if (!classData) {
    return (
      <section className="single-class-main" style={{ opacity: 0 }}>
        <div className="single-class-z-index">Class not found.</div>
      </section>
    );
  }

  return (
    <section
      className="single-class-main"
      ref={wrapperRef}
      style={{ opacity: 0 }}
    >
      <div className="single-class-z-index">
        <h1 className="urban-thin-font blue-text">
          Ages {classData.startAge}-{classData.endAge}
        </h1>

        <PageTitle title={classData.title} blerb={classData.description} />

        <div className="single-class-details">
          <div className="single-block">
            <p className="bebas-font">
              <strong>Style:</strong>
            </p>
            <p className="urban-thin-font">{classData.style}</p>
          </div>

          <div className="single-block">
            <p className="bebas-font">
              <strong>Level:</strong>
            </p>
            <p className="urban-thin-font">{classData.level}</p>
          </div>

          <div className="single-block">
            <p className="urban-thin-font" style={{ margin: "0 auto" }}>
              ${classData.price} {classData.priceParam}
            </p>
          </div>
        </div>

        <Button text="Sign Up Here" />
      </div>
    </section>
  );
}
