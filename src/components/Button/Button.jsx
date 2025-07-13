import { useState } from "react";
import "./button.css";

export function Button({ text, fontSize, margin, onClick, opacity = true }) {
  const [isHover, setIsHover] = useState(false);
  return (
    <button
      className="button-main letter-space  bebas-thin-font"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{
        fontSize: fontSize ? fontSize : "clamp(1.8rem, 1.9vw, 2rem)",
        margin: margin,
        opacity: opacity ? "1" : "0",
      }}
      onClick={onClick}
    >
      <span
        style={{
          zIndex: 2,
        }}
      >
        {text}
      </span>
      <div className={`hover-bg ${isHover ? "active" : ""}`}></div>
    </button>
  );
}
