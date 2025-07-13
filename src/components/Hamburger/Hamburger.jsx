import { useEffect, useState } from "react";
import "./hamburger.css";

export function Hamburger({ isOpened }) {
  const [hasLoaded, setHasLoaded] = useState(false);

  return (
    <button className="ham-button">
      <svg
        className={`hamburger ${
          hasLoaded ? (isOpened ? "open" : "close") : ""
        }`}
        onClick={() => {
          setHasLoaded(true);
        }}
        viewBox="0 0 100 100"
        width="50"
      >
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="purple" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0bf0ff" />
            <stop offset="100%" stopColor="#f014ff" />
          </linearGradient>
        </defs>

        {/* Hamburger Lines */}
        <g className="top-group">
          <line className="line top" x1="10" x2="90" y1="30" y2="30" />
        </g>
        <g className="middle-group">
          <line className="line middle" x1="10" x2="90" y1="50" y2="50" />
        </g>
        <g className="bottom-group">
          <line className="line bottom" x1="10" x2="90" y1="70" y2="70" />
        </g>
      </svg>
    </button>
  );
}
