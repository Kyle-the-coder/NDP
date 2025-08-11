import { Outlet, useNavigation } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import { Nav } from "../components/Nav/Nav";
import { Footer } from "../components/Footer/Footer";
import { Loader } from "../components/Loader/Loader";

import { InfoContext } from "../contexts/infoContext";

import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export function MainLayout() {
  const { state } = useNavigation();
  const [infoData, setInfoData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNdpData() {
      try {
        const ndpCollection = collection(db, "ndp");
        const querySnapshot = await getDocs(ndpCollection);

        const dataByDocId = {};
        querySnapshot.forEach((doc) => {
          dataByDocId[doc.id] = doc.data();
        });

        setInfoData(dataByDocId);
      } catch (err) {
        console.error("Error loading ndp data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchNdpData();
  }, []);

  if (state === "loading" || loading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  return (
    <InfoContext.Provider value={infoData}>
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
