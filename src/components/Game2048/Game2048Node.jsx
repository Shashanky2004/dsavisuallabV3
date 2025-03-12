import React from "react";
import "./Game2048Node.css";

const setColor = {
  "": "rgba(255, 255, 255, 0.1)",
  2: "#eee4da",
  4: "#ede0c8",
  8: "#f2b179",
  16: "#f59563",
  32: "#f67c5f",
  64: "#f65e3b",
  128: "#edcf72",
  256: "#edcc61",
  512: "#edc850",
  1024: "#edc53f",
  2048: "#edc22e"
};

const setTextColor = {
  "": "transparent",
  2: "#776e65",
  4: "#776e65",
  8: "#f9f6f2",
  16: "#f9f6f2",
  32: "#f9f6f2",
  64: "#f9f6f2",
  128: "#f9f6f2",
  256: "#f9f6f2",
  512: "#f9f6f2",
  1024: "#f9f6f2",
  2048: "#f9f6f2"
};

const Game2048Node = ({ col, row, value }) => {
  const backgroundColor = setColor[value];
  const textColor = setTextColor[value];
  const fontSize = value >= 100 ? '80%' : '100%';

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node-Game2048`}
      style={{
        width: `${window.innerWidth / 20}px`,
        height: `${window.innerWidth / 20}px`,
        lineHeight: `${window.innerWidth / 20}px`,
        backgroundColor,
        color: textColor,
        fontSize
      }}
    >
      {value}
    </div>
  );
};

export default Game2048Node;
