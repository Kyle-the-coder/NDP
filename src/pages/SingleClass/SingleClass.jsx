import { useParams } from "react-router-dom";
import { useContext, useMemo, useEffect } from "react";
import { InfoContext } from "../../contexts/infoContext";

import "./singleclass.css";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { Button } from "../../components/Button/Button";
import { Loader } from "../../components/Loader/Loader";

export default function SingleClass() {
  const { id } = useParams();
  const infoData = useContext(InfoContext);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Determine classData only when context is available
  const classData = useMemo(() => {
    if (!infoData?.classes?.allClasses) return null;
    return infoData.classes.allClasses.find((c) => c.id === id) || null;
  }, [id, infoData]);

  // If context hasn't loaded yet, show a small loader
  console.log(infoData);
  if (!infoData || Object.keys(infoData).length === 0) {
    return (
      <div className="loader-container" style={{ minHeight: "50vh" }}>
        <Loader size="small" />
      </div>
    );
  }

  // Only show "Class not found" if context is loaded but classData is null
  if (!classData) {
    return <div className="single-class-main">Class not found.</div>;
  }

  return (
    <section className="single-class-main">
      <div className="single-class-z-index">
        <PageTitle
          title={classData.title}
          blerb={classData.shortDescription || ""}
        />

        <div className="single-class-info-container">
          <h2>{classData.title}</h2>
          <p>{classData.description}</p>

          <div className="single-class-details">
            <p>
              <strong>Ages:</strong> {classData.ageGroup}, Ages{" "}
              {classData.startAge}-{classData.endAge}
            </p>
            <p>
              <strong>Style:</strong> {classData.style}
            </p>
            <p>
              <strong>Level:</strong> {classData.level}
            </p>
            <p>
              <strong>Price:</strong> ${classData.price}
            </p>
          </div>
          <Button text="See info here" />
        </div>
      </div>
    </section>
  );
}
