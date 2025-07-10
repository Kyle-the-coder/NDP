import { Outlet, useNavigation } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
// import { Nav } from "../components/Nav/Nav";
// import { Footer } from "../components/Footer/Footer";
// import upArrow from "../assets/icons/ogUpArrow.png";
// import { scrollToSection } from "../components/SmoothScroll";
// import { Loader } from "../components/Loader/Loader";
// import { db } from "../firebaseConfig";
// import { collection, getDocs } from "firebase/firestore";
import { InfoContext } from "../contexts/infoContext";

export function MainLayout() {
  const { state } = useNavigation();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     async function fetchClasses() {
  //       try {
  //         const querySnapshot = await getDocs(collection(db, "class"));
  //         const data = querySnapshot.docs.map((doc) => ({
  //           ...doc.data(),
  //           id: doc.id,
  //         }));
  //         setClasses(data);
  //       } catch (err) {
  //         console.error("Error loading classes:", err);
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //     fetchClasses();
  //   }, []);

  //   if (state === "loading" || loading) {
  //     return <Loader />; // 👈 Only show loader until both route & data are ready
  //   }

  return (
    <InfoContext.Provider value={classes}>
      <div className="main-container silver-bg">
        {/* <img
          src={upArrow}
          className="main-up-arrow"
          onClick={() => scrollToSection("#nav")}
        /> */}
        {/* <Nav /> */}
        <Suspense fallback={<h1>Loader</h1>}>
          <Outlet />
        </Suspense>
        {/* <Footer /> */}
      </div>
    </InfoContext.Provider>
  );
}
