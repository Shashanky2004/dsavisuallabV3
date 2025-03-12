import React from "react";
import "../GraphNode.css";

const MinimumCostPathNode = ({
  col,
  row,
  isFinish,
  isStart,
  isWall,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  cost,
  graphtype,
  TOTAL_COL,
}) => {
  const extraClassName = isFinish
    ? "node-finish"
    : isStart
    ? "node-start"
    : isWall
    ? "node-wall"
    : "";

  const getCostColor = (cost) => {
    // Color gradient from green (low cost) to red (high cost)
    const hue = ((9 - cost) * 120) / 8; // Maps 1-9 to 120-0 (green to red)
    return `hsl(${hue}, 70%, 50%)`;
  };

  const nodeSize = Math.min(Math.max(window.innerWidth / (TOTAL_COL * 2), 25), 35);

  return (
    <div
      id={`node-${row}-${col}-${graphtype}`}
      className={`node ${extraClassName}`}
      style={{
        width: `${nodeSize}px`,
        height: `${nodeSize}px`,
        fontSize: `${nodeSize / 2}px`,
        textAlign: "center",
        lineHeight: `${nodeSize}px`,
        color: !isStart && !isFinish && !isWall ? getCostColor(cost) : "#fff",
        fontWeight: "bold",
        textShadow: "0px 0px 2px rgba(0,0,0,0.5)",
      }}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    >
      {cost}
    </div>
  );
};

export default MinimumCostPathNode;
