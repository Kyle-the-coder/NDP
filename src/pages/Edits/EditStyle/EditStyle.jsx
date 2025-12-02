import spaceBg from "../../../assets/hero/NBDHeroBg.webp";
import add from "../../../assets/icons/functIcons/free-style.png";
import arrow from "../../../assets/icons/functIcons/arrow.png";
import { Button } from "../../../components/Button/Button";
import { Loader } from "../../../components/Loader/Loader";
import { useContext, useEffect, useRef, useState } from "react";
import { db } from "../../../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Card } from "../../../components/Card/Card";
import {
  useNavigate,
  useNavigationType,
  useOutletContext,
  useParams,
} from "react-router-dom";
import gsap from "gsap";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { SelectedCardContext } from "../../../contexts/selectedCardContext";
import { scrollToSection } from "../../../components/SmoothScroll";
import { IsEditContext } from "../../../contexts/isEditContext";
import "./editstyle.css";

export default function EditStyle() {
  const { id } = useParams(); // ← 🔥 GET ID FROM URL
  const [style, setStyle] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [description, setDescription] = useState("");
  const [stylePng, setStylePng] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cardArray, setCardArray] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const videoInputRef = useRef();
  const pngInputRef = useRef();
  const wrapperRef = useRef();
  const navigate = useNavigate();

  const navigationType = useNavigationType();
  const { selectedId, setSelectedId } = useContext(SelectedCardContext);
  const { backState } = useOutletContext();
  const isEdit = useContext(IsEditContext);

  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const [pngProgress, setPngProgress] = useState(0);
  const [pngUploading, setPngUploading] = useState(false);

  const storage = getStorage();
  const DocRef = doc(db, "ndp", "danceStyles");

  // Hide wrapper initially
  useEffect(() => {
    if (wrapperRef.current) gsap.set(wrapperRef.current, { opacity: 0 });
  }, []);

  // -----------------------------------------
  // 🔥 PRELOAD STYLE BASED ON ID
  // -----------------------------------------
  useEffect(() => {
    async function loadStyle() {
      const snap = await getDoc(DocRef);
      if (!snap.exists()) return;

      const data = snap.data();
      const styles = data.allStyles || [];

      setCardArray(styles);

      const existing = styles.find((s) => s.id === id);

      if (existing) {
        setStyle(existing.title || "");
        setDescription(existing.description || "");
        setVideoLink(existing.link || "");
        setStylePng(existing.png || "");
      }

      setDataLoaded(true);
    }

    loadStyle();
  }, [id]);

  // -----------------------------------------
  // Fade-in after data loads
  // -----------------------------------------
  const hasShown = useRef(false);

  useEffect(() => {
    if (!wrapperRef.current || !dataLoaded || hasShown.current) return;

    const tl = gsap.timeline();
    tl.to(wrapperRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    });

    hasShown.current = true;
  }, [dataLoaded]);

  // -----------------------------------------
  // Video Upload
  // -----------------------------------------
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const filePath = `danceStyles/videos/${Date.now()}_${file.name}`;
    const uploadTask = uploadBytesResumable(ref(storage, filePath), file);

    uploadTask.on(
      "state_changed",
      (snap) => {
        setUploadProgress(
          Math.floor((snap.bytesTransferred / snap.totalBytes) * 100)
        );
      },
      console.error,
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setVideoLink(url);
        setUploading(false);
      }
    );
  };

  // -----------------------------------------
  // PNG Upload
  // -----------------------------------------
  const handlePngUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPngUploading(true);
    const filePath = `danceStyles/png/${Date.now()}_${file.name}`;
    const uploadTask = uploadBytesResumable(ref(storage, filePath), file);

    uploadTask.on(
      "state_changed",
      (snap) => {
        setPngProgress(
          Math.floor((snap.bytesTransferred / snap.totalBytes) * 100)
        );
      },
      console.error,
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setStylePng(url);
        setPngUploading(false);
      }
    );
  };

  // -----------------------------------------
  // 🔥 SUBMIT — UPDATE EXISTING STYLE
  // -----------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoLink || !stylePng) {
      alert("Please wait for uploads to finish.");
      return;
    }

    setLoading(true);

    const snap = await getDoc(DocRef);
    const allStyles = snap.data().allStyles || [];

    const updated = allStyles.map((s) =>
      s.id === id
        ? {
            ...s,
            title: style,
            description,
            link: videoLink,
            png: stylePng,
            updatedAt: new Date().toISOString(),
          }
        : s
    );

    await updateDoc(DocRef, { allStyles: updated });

    setSuccess(true);
    setLoading(false);

    setTimeout(() => navigate("/dashboard"), 800);
  };

  // -----------------------------------------
  // JSX
  // -----------------------------------------
  return (
    <section className="create-style-main" ref={wrapperRef}>
      <div className="back-arrow-container">
        <img
          src={arrow}
          className="back-arrow"
          onClick={() => navigate("/dashboard")}
        />
      </div>

      <div className="create-style-title">
        <h1 className="bebas-font">Edit Style</h1>
      </div>

      <div className="create-style-form-display-container">
        <div className="create-style-form-container">
          <form className="create-style-form" onSubmit={handleSubmit}>
            <div className="styles-form-img-container">
              <img src={add} className="styles-form-img" />
            </div>

            <div className="form-title">
              <h1 className="bebas-font">Edit Style</h1>
            </div>

            {success && (
              <p style={{ color: "green", marginBottom: 16 }}>
                ✅ Style updated!
              </p>
            )}

            <div className="input-container">
              <label className="urban-font label">Style:</label>
              <input
                type="text"
                className="input urban-thin-font"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                required
              />
            </div>

            <div className="input-container">
              <label className="urban-font label">Description:</label>
              <textarea
                rows={10}
                className="input urban-thin-font"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="input-container">
              <label className="urban-font label">Replace Video:</label>
              <input
                type="file"
                accept="video/*"
                ref={videoInputRef}
                className="input urban-thin-font"
                onChange={handleVideoUpload}
              />

              {uploading && (
                <div className="upload-circle-container">
                  <img src={spaceBg} />
                  <div
                    className="upload-circle"
                    style={{
                      background: `conic-gradient(transparent ${
                        uploadProgress * 3.6
                      }deg, #3e3e3eff 0deg)`,
                    }}
                  >
                    <span className="upload-percent">{uploadProgress}%</span>
                  </div>
                </div>
              )}
            </div>

            <div className="input-container">
              <label className="urban-font label">Replace PNG:</label>
              <input
                type="file"
                accept="image/png,image/*"
                ref={pngInputRef}
                onChange={handlePngUpload}
                className="input urban-thin-font"
              />

              {pngUploading && (
                <div className="upload-circle-container">
                  <img src={spaceBg} />
                  <div
                    className="upload-circle"
                    style={{
                      background: `conic-gradient(transparent ${
                        pngProgress * 3.6
                      }deg, #3e3e3eff 0deg)`,
                    }}
                  >
                    <span className="upload-percent">{pngProgress}%</span>
                  </div>
                </div>
              )}
            </div>

            {loading ? <Loader /> : <Button text="Save Changes" />}
          </form>
        </div>

        <div className="create-style-display-container">
          <div className="create-style-display">
            <div className="create-style-preview-png">
              {stylePng ? (
                <img src={stylePng} alt="PNG Preview" />
              ) : (
                <h2 className="urban-thin-font">(PNG)</h2>
              )}
              <h1 className="bebas-font blue-text">{style || "Style"}</h1>
            </div>

            <p className="urban-thin-font">{description || "Description"}</p>

            <h2 className="urban-thin-font">Video Preview:</h2>
            {videoLink && (
              <video
                src={videoLink}
                controls
                style={{ width: "100%", marginTop: "1rem" }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
