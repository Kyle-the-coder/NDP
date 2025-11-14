import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Nav } from "../components/Nav/Nav";
import { Footer } from "../components/Footer/Footer";
import { Loader } from "../components/Loader/Loader";

import mainBg from "../assets/decor/imgs/NDPAboutBg.png";
import { InfoContext } from "../contexts/infoContext";

import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export function MainLayout() {
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

  // Only show loader while fetching global data
  // if (loading) {
  //   return (
  //     <div className="loader-container" style={{ minHeight: "100vh" }}>
  //       <Loader />
  //     </div>
  //   );
  // }

  return (
    <InfoContext.Provider value={infoData}>
      <div className="main-container white-text">
        <img src={mainBg} className="main-bg" />

        <Nav />

        {/* Main content */}
        <div className="content-container" style={{ minHeight: "80vh" }}>
          {loading && (
            <div className="loader-container" style={{ minHeight: "100vh" }}>
              <Loader />
            </div>
          )}
          {/* No Suspense loader here; routes render instantly */}
          <Outlet />
        </div>

        <Footer />
      </div>
    </InfoContext.Provider>
  );
}
