// SingleClass.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useMemo, useEffect, useRef } from "react";
import { InfoContext } from "../../../contexts/infoContext";
import { PageTitle } from "../../../components/PageTitle/PageTitle";
import { Button } from "../../../components/Button/Button";
import backArrow from "../../../assets/icons/functIcons/arrow.png";
import gsap from "gsap";
import "./singleclass.css";

export default function SingleClass({
  isDisplay = false,
  dStartAge,
  dEndAge,
  dTitle,
  dBlerb,
  dStyle,
  dLevel,
  dPrice,
  dPriceParam,
}) {
  const { id } = useParams();
  const infoData = useContext(InfoContext);
  const wrapperRef = useRef(null);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 250);
  };
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
      {isDisplay ? (
        <></>
      ) : (
        <img
          src={backArrow}
          onClick={handleBack}
          style={{
            width: "40px",
            position: "absolute",
            top: "4%",
            left: "4%",
            cursor: "pointer",
          }}
        />
      )}

      <div className="single-class-z-index">
        {isDisplay ? (
          <h1 className="urban-thin-font blue-text">
            Ages {dStartAge}-{dEndAge}
          </h1>
        ) : (
          <h1 className="urban-thin-font blue-text">
            Ages {classData.startAge}-{classData.endAge}
          </h1>
        )}

        {isDisplay ? (
          <PageTitle title={dTitle} blerb={dBlerb} />
        ) : (
          <PageTitle title={classData.title} blerb={classData.description} />
        )}

        <div className="single-class-details">
          <div className="single-block">
            <p className="bebas-font">
              <strong>Style:</strong>
            </p>
            {isDisplay ? (
              <p className="urban-thin-font">{dStyle}</p>
            ) : (
              <p className="urban-thin-font">{classData.style}</p>
            )}
          </div>

          <div className="single-block">
            <p className="bebas-font">
              <strong>Level:</strong>
            </p>
            {isDisplay ? (
              <p className="urban-thin-font">{dLevel}</p>
            ) : (
              <p className="urban-thin-font">{classData.level}</p>
            )}
          </div>

          <div className="single-block">
            {isDisplay ? (
              <p className="urban-thin-font" style={{ margin: "0 auto" }}>
                ${dPrice} {dPriceParam}
              </p>
            ) : (
              <p className="urban-thin-font" style={{ margin: "0 auto" }}>
                ${classData.price} {classData.priceParam}
              </p>
            )}
          </div>
        </div>

        <Button text="Sign Up Here" />
      </div>
    </section>
  );
}
