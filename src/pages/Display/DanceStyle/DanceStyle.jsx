import { useParams, useNavigate } from "react-router-dom";
import { useContext, useMemo, useEffect, useRef, useState } from "react";
import { InfoContext } from "../../../contexts/infoContext";
import { PageTitle } from "../../../components/PageTitle/PageTitle";
import { IsEditContext } from "../../../contexts/isEditContext";
import backArrow from "../../../assets/icons/functIcons/arrow.png";
import gsap from "gsap";
import "./dancestyle.css";

export default function DanceStyle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const infoData = useContext(InfoContext);
  const isEdit = useContext(IsEditContext);
  console.log(isEdit, "style");

  const wrapperRef = useRef(null);
  const videoRef = useRef(null);

  const [isReady, setIsReady] = useState(false);

  const handleBack = () => {
    isEdit.isEdit === "/createStyle"
      ? navigate("/createStyle", { state: { fromBack: true, targetId: id } })
      : navigate("/", { state: { fromBack: true, targetId: id } });
  };

  // Find correct style
  const styleData = useMemo(() => {
    if (!infoData?.danceStyles?.allStyles) return null;
    return infoData.danceStyles.allStyles.find((c) => c.id === id) || null;
  }, [id, infoData]);

  // Run fade-in when fully ready
  useEffect(() => {
    if (isReady) {
      gsap.to(wrapperRef.current, {
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      });
    }
  }, [isReady]);

  // Context not yet available → stay invisible
  if (!infoData || Object.keys(infoData).length === 0) {
    return <section className="dance-style-main" style={{ opacity: 0 }} />;
  }

  if (!styleData) {
    return (
      <section className="dance-style-main" style={{ opacity: 0 }}>
        <div className="dance-style-z-index">Style not found.</div>
      </section>
    );
  }

  return (
    <section
      className="dance-style-main"
      ref={wrapperRef}
      style={{ opacity: 0 }} // Start invisible
    >
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

      <div className="dance-style-z-index">
        <PageTitle title={styleData.title} blerb={styleData.description} />

        <video
          ref={videoRef}
          controls
          src={styleData.link}
          className="dance-style-video"
          onLoadedData={() => setIsReady(true)} // 🔥 run only when video can play
        />
      </div>
    </section>
  );
}
