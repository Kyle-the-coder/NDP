import { Outlet, useNavigation } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import { Nav } from "../components/Nav/Nav";
import { Footer } from "../components/Footer/Footer";
import { Loader } from "../components/Loader/Loader";

import { InfoContext } from "../contexts/infoContext";

// Import Firestore functions and your configured db instance
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export function MainLayout() {
  const { state } = useNavigation();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClasses() {
      try {
        // Reference to "classes" collection (make sure it's plural and matches your Firestore)
        const classesCollection = collection(db, "classes");
        const querySnapshot = await getDocs(classesCollection);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClasses(data);
      } catch (err) {
        console.error("Error loading classes:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchClasses();
  }, []);

  if (state === "loading" || loading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  return (
    <InfoContext.Provider value={classes}>
      <div className="main-container white-text">
        <Nav />
        <Suspense
          fallback={
            <div className="loader-container">
              <Loader />
            </div>
          }
        >
          <Outlet />
        </Suspense>
        <Footer />
      </div>
    </InfoContext.Provider>
  );
}
