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

  // Only compute classData if context is loaded
  const classData = useMemo(() => {
    if (!infoData?.classes?.allClasses) return null;
    return infoData.classes.allClasses.find((c) => c.id === id) || null;
  }, [id, infoData]);

  // 1️⃣ Show loader if context is not ready yet
  if (!infoData || Object.keys(infoData).length === 0) {
    return (
      <div className="loader-container" style={{ minHeight: "50vh" }}>
        <Loader size="small" />
      </div>
    );
  }

  // 2️⃣ Show error only if context ready but class not found
  if (!classData) {
    return <div className="single-class-main">Class not found.</div>;
  }

  // 3️⃣ Context ready and class exists → render class
  return (
    <section className="single-class-main">
      {Object.keys(infoData).length === 0 ? (
        // Loader while context is empty
        <div className="loader-container" style={{ minHeight: "50vh" }}>
          <Loader size="small" />
        </div>
      ) : classData ? (
        // Class content once context and classData are ready
        <div className="single-class-z-index">
          <PageTitle title={classData.title} />

          <div className="display-column">
            <p
              className="urban-thin-font"
              style={{ fontSize: "2rem", textAlign: "center" }}
            >
              {classData.description}
            </p>

            <div className="single-class-details">
              <div className="single-block-flex-container">
                <div className="single-block">
                  <p className="bebas-font">
                    <strong>Ages:</strong>
                  </p>
                  <p className="urban-thin-font">
                    {classData.ageGroup}, Ages {classData.startAge}-
                    {classData.endAge}
                  </p>
                </div>

                <div className="single-block">
                  <p className="bebas-font">
                    <strong>Style:</strong>
                  </p>
                  <p className="urban-thin-font">{classData.style}</p>
                </div>
              </div>

              <div className="single-block">
                <p className="bebas-font">
                  <strong>Level:</strong>
                </p>
                <p className="urban-thin-font"> {classData.level}</p>
              </div>

              <div className="single-block">
                <p className="bebas-font">
                  <strong>Price:</strong>
                </p>
                <p className="urban-thin-font">
                  {" "}
                  ${classData.price} {classData.priceParam}
                </p>
              </div>
            </div>
            <Button text="Sign Up Here" />
          </div>
        </div>
      ) : (
        // If context loaded but class not found
        <div className="single-class-z-index">Class not found.</div>
      )}
    </section>
  );
}
