import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

import singleClassBg from "../../assets/decor/imgs/NDPAboutBg.png";
import "./singleclass.css";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { Button } from "../../components/Button/Button";
import { Loader } from "../../components/Loader/Loader";

export default function SingleClass() {
  const { id } = useParams();

  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("hello");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    async function fetchClass() {
      try {
        // Pull your single ndp document
        const docRef = doc(db, "ndp", "classes");
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data());

        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("hello");
          // Ensure the structure exists
          const allClasses = data?.allClasses;
          console.log("found", allClasses);
          if (!allClasses || !Array.isArray(allClasses)) {
            setError("Class list is missing.");
            setLoading(false);
            return;
          }

          // Find the specific class in the array
          const foundClass = allClasses.find((c) => c.id === id);

          if (foundClass) {
            setClassData(foundClass);
          } else {
            setError("Class not found.");
          }
        } else {
          setError("NDP data not found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load class data.");
      }

      setLoading(false);
    }

    fetchClass();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="display-column">
        <Loader />
      </div>
    );
  }

  // Error state
  if (error) {
    return <div className="single-class-main">{error}</div>;
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
