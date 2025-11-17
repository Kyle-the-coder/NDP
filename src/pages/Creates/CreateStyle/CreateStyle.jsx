import createClassBg from "../../../assets/decor/imgs/NDPAboutBg.png";
import add from "../../../assets/icons/functIcons/free-style.png";
import arrow from "../../../assets/icons/functIcons/arrow.png";
import { Button } from "../../../components/Button/Button";
import { Loader } from "../../../components/Loader/Loader";
import { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Card } from "../../../components/Card/Card";
import { useNavigate } from "react-router-dom";
import "./createstyle.css";

// 🔥 Storage imports
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export default function CreateStyle() {
  const [style, setStyle] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [description, setDescription] = useState("");
  const [stylePng, setStylePng] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cardArray, setCardArray] = useState([]);

  // Upload progress states
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  // PNG upload progress states
  const [pngProgress, setPngProgress] = useState(0);
  const [pngUploading, setPngUploading] = useState(false);

  const navigate = useNavigate();

  const storage = getStorage();
  const DocRef = doc(db, "ndp", "danceStyles");

  // Load existing styles
  useEffect(() => {
    async function fetchStyles() {
      try {
        const docSnap = await getDoc(DocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const stylesData = (data.allStyles || []).map((cls, idx) => {
            const desc = cls.description || "";
            return {
              id: cls.id || idx.toString(),
              class: true,
              title: cls.title,
              blerb:
                desc.split(" ").length > 17
                  ? desc.split(" ").slice(0, 17).join(" ") + "..."
                  : desc,
              link: cls.link || "",
            };
          });
          setCardArray(stylesData);
        }
      } catch (err) {
        console.error("Error fetching styles:", err);
      }
    }
    fetchStyles();
  }, []);

  // -----------------------------------------
  // 🔥 VIDEO UPLOAD
  // -----------------------------------------
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);
    setSuccess(false);

    const filePath = `danceStyles/videos/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, filePath);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(Math.floor(progress));
      },
      (error) => {
        console.error("Upload error:", error);
        setUploading(false);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setVideoLink(url);
        setUploading(false);
        console.log("Uploaded VIDEO URL:", url);
      }
    );
  };

  // -----------------------------------------
  // 🔵 PNG UPLOAD
  // -----------------------------------------
  const handlePngUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPngUploading(true);
    setPngProgress(0);
    setSuccess(false);

    const filePath = `danceStyles/png/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, filePath);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPngProgress(Math.floor(progress));
      },
      (error) => {
        console.error("PNG Upload error:", error);
        setPngUploading(false);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setStylePng(url);
        setPngUploading(false);
        console.log("Uploaded PNG URL:", url);
      }
    );
  };

  // -----------------------------------------
  // 🔥 SUBMIT FORM
  // -----------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoLink || !stylePng) {
      alert("Please wait for ALL uploads to finish.");
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      const docSnap = await getDoc(DocRef);
      let currentStyles = [];
      if (docSnap.exists()) {
        const data = docSnap.data();
        currentStyles = data.allStyles || [];
      }

      const newStyle = {
        id: Date.now().toString(),
        title: style,
        description,
        link: videoLink,
        png: stylePng, // 🔥 store PNG URL
        createdAt: new Date().toISOString(),
      };

      const updatedStyles = [newStyle, ...currentStyles];

      await updateDoc(DocRef, { allStyles: updatedStyles });

      const stylesData = updatedStyles.map((cls, idx) => {
        const desc = cls.description || "";
        return {
          id: cls.id || idx.toString(),
          class: true,
          title: cls.title,
          blerb:
            desc.split(" ").length > 17
              ? desc.split(" ").slice(0, 17).join(" ") + "..."
              : desc,
          link: cls.link || "",
        };
      });

      setCardArray(stylesData);

      setStyle("");
      setDescription("");
      setVideoLink("");
      setStylePng("");
      setUploadProgress(0);
      setPngProgress(0);
      setSuccess(true);
    } catch (err) {
      console.error("Error adding style:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="create-style-main">
      <div className="back-arrow-container">
        <img
          src={arrow}
          className="back-arrow"
          onClick={() => {
            navigate("/dashboard");
            window.scrollTo(0, 0);
          }}
        />
      </div>

      <div className="create-style-title">
        <h1 className="bebas-font">Create Style</h1>
      </div>

      <div className="create-style-form-display-container">
        <div className="create-style-form-container">
          <form className="create-style-form" onSubmit={handleSubmit}>
            <div className="styles-form-img-container">
              <img src={add} className="styles-form-img" />
            </div>

            <div className="form-title">
              <h1 className="bebas-font">Create Style</h1>
            </div>

            {success && (
              <p
                style={{ color: "green", fontWeight: "bold", marginBottom: 16 }}
              >
                ✅ Style added successfully!
              </p>
            )}

            <div className="input-container">
              <label className="urban-font label">Style:</label>
              <input
                type="text"
                placeholder="Enter Style"
                className="input urban-thin-font"
                value={style}
                onChange={(e) => {
                  setStyle(e.target.value);
                  setSuccess(false);
                }}
                required
              />
            </div>

            <div className="input-container">
              <label className="urban-font label">Description:</label>
              <textarea
                rows={10}
                placeholder="Enter Description"
                className="input urban-thin-font"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {/* VIDEO INPUT */}
            <div className="input-container">
              <label className="urban-font label">Upload Video:</label>

              <input
                type="file"
                accept="video/*"
                className="input urban-thin-font"
                onChange={handleVideoUpload}
                required
              />

              {/* Circular Upload */}
              {uploading && (
                <div className="upload-circle-container">
                  <div
                    className="upload-circle"
                    style={{
                      background: `conic-gradient(#4fa3ff ${
                        uploadProgress * 3.6
                      }deg, #ddd 0deg)`,
                    }}
                  >
                    <span className="upload-percent">{uploadProgress}%</span>
                  </div>
                </div>
              )}
            </div>

            {/* PNG INPUT */}
            <div className="input-container">
              <label className="urban-font label">Upload PNG:</label>

              <input
                type="file"
                accept="image/png,image/*"
                className="input urban-thin-font"
                onChange={handlePngUpload}
                required
              />

              {/* Circular PNG Upload */}
              {pngUploading && (
                <div className="upload-circle-container">
                  <div
                    className="upload-circle"
                    style={{
                      background: `conic-gradient(#4fa3ff ${
                        pngProgress * 3.6
                      }deg, #ddd 0deg)`,
                    }}
                  >
                    <span className="upload-percent">{pngProgress}%</span>
                  </div>
                </div>
              )}
            </div>

            {loading ? <Loader /> : <Button text="Submit" />}
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

          <h1 className="anton-font blue-text size">Current Styles</h1>
          <div className="create-style-grid">
            {cardArray.map((info, index) => {
              console.log(info.png);
              return (
                <Card
                  isClass={info.class}
                  key={index}
                  title={info.title}
                  blerb={info.blerb}
                  link={info.link}
                  png={info.png}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
