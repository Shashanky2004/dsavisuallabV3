import React from "react";
import "./MinesweeperNode.css";

const MinesweeperNode = ({
  col,
  row,
  distance,
  isRevealed,
  isMine,
  isFlagged,
  onClick,
  TOTAL_COL,
}) => {
  const getNodeClassName = () => {
    if (isFlagged) return "node-flagged";
    if (isMine && isRevealed) return "node-mine";
    if (isRevealed) return "node-revealed";
    return "node-hidden";
  };

  const getDistanceColor = (distance) => {
    const colors = {
      1: "#2196F3", // Blue
      2: "#4CAF50", // Green
      3: "#F44336", // Red
      4: "#9C27B0", // Purple
      5: "#FF9800", // Orange
      6: "#00BCD4", // Cyan
      7: "#000000", // Black
      8: "#795548", // Brown
    };
    return colors[distance] || "#000000";
  };

  const getNodeSize = () => {
    const width = window.innerWidth;
    const baseSize = Math.min(width / (TOTAL_COL * 1.5), 35);
    return Math.max(baseSize, 20);
  };

  const nodeSize = getNodeSize();

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node-Minesweeper ${getNodeClassName()}`}
      style={{
        width: `${nodeSize}px`,
        height: `${nodeSize}px`,
        fontSize: `${nodeSize * 0.6}px`,
        lineHeight: `${nodeSize}px`,
      }}
      onClick={onClick}
      onContextMenu={onClick}
    >
      {isRevealed && !isMine && distance > 0 && (
        <span style={{ color: getDistanceColor(distance) }}>
          {distance}
        </span>
      )}
      {isFlagged && "🚩"}
      {isMine && isRevealed && "💣"}
    </div>
  );
};

export default MinesweeperNode;
