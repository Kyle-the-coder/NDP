import placeholder from "../../../assets/placeholder/Placeholder.mp4";
import "./vid.css";

export function Vid() {
  return (
    <div className="vid-main">
      <video preload="none" controls autoPlay muted src={placeholder} loop />
    </div>
  );
}
