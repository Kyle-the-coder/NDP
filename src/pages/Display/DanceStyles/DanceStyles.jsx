// SingleClass.jsx
import { useParams } from "react-router-dom";
import { useContext, useMemo, useEffect, useRef } from "react";
import { InfoContext } from "../../../contexts/infoContext";
import { PageTitle } from "../../../components/PageTitle/PageTitle";
import gsap from "gsap";
import "./dancestyle.css";

export default function DanceStyle() {
  const { id } = useParams();
  const infoData = useContext(InfoContext);
  const wrapperRef = useRef(null);
  console.log(infoData);
  // Compute class data only when context is ready
  const styleData = useMemo(() => {
    if (!infoData?.danceStyles?.allStyles) return null;
    return infoData.danceStyles.allStyles.find((c) => c.id === id) || null;
  }, [id, infoData]);

  console.log(styleData);

  useEffect(() => {
    if (!styleData) return;

    gsap.fromTo(
      wrapperRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: "power2.out" }
    );
  }, [styleData]);

  // Context not yet available → show nothing (keeps it invisible)
  if (!infoData || Object.keys(infoData).length === 0) {
    return <section className="dance-style-main" style={{ opacity: 0 }} />;
  }

  // Class not found
  if (!styleData) {
    return (
      <section className="dance-style-main" style={{ opacity: 0 }}>
        <div className="dance-style-z-index">Class not found.</div>
      </section>
    );
  }

  return (
    <section
      className="dance-style-main"
      ref={wrapperRef}
      style={{ opacity: 0 }}
    >
      <div className="dance-style-z-index">
        <PageTitle title={styleData.title} blerb={styleData.description} />

        <video
          controls
          autoPlay
          src={styleData.link}
          className="dance-style-video"
        />
      </div>
    </section>
  );
}
