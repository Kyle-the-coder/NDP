import techOutline from "../../assets/decor/lines/techOutline.svg";
import "./techdisplay.css";

export function TechDisplay({ center }) {
  return (
    <div className="tech-content-container">
      <div className="tech-content">{center}</div>

      <img src={techOutline} className="tech-content-decor" />
    </div>
  );
}
