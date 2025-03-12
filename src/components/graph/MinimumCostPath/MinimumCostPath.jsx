import React, { useState, useRef, useEffect } from "react";
import {
  getNodesInShortestPathOrder,
  minimumCostPath,
} from "./getMinimumCostPath";
import classes from "../Graph.module.css";
import Button from "../../ui/Button";
import { BackButton } from "../../ui/BackButton";
import MinimumCostPathNode from "./MinimumCostPathNode";

const MinimumCostPath = () => {
  const START_NODE_ROW = 1;
  const START_NODE_COL = 1;
  const FINISH_NODE_ROW = 13;
  const FINISH_NODE_COL = 28;
  const ANIMATION_SPEED = 50; // Increased for better visualization
  const max = 9;
  const min = 1;
  const graphtype = "mcp";
  
  var TOTAL_ROW = 15;
  var TOTAL_COL = 45;
  if (window.innerWidth < 800) {
    TOTAL_ROW = 10;
    TOTAL_COL = 30;
  }
  if (window.innerWidth < 400) {
    TOTAL_ROW = 7;
    TOTAL_COL = 20;
  }

  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const answerRef = useRef(null);

  // Step 1
  const createNode = (col, row) => {
    return {
      row,
      col,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
      cost: Math.floor(Math.random() * (max - min + 1) + min),
    };
  };

  const refileGrid = () => {
    setIsAnimating(false);
    answerRef.current.innerHTML = "";
    for (let row = 0; row < TOTAL_ROW; row++) {
      for (let col = 0; col < TOTAL_COL; col++) {
        const node = document.getElementById(`node-${row}-${col}-${graphtype}`);
        if (row === START_NODE_ROW && col === START_NODE_COL) {
          node.className = "node node-start";
        } else if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) {
          node.className = "node node-finish";
        } else {
          node.className = "node";
        }
      }
    }
  };

  const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < TOTAL_ROW; row++) {
      const currentRow = [];
      for (let col = 0; col < TOTAL_COL; col++) {
        currentRow.push(createNode(col, row));
      }
      grid.push(currentRow);
    }
    setGrid(grid);
  };

  useEffect(() => {
    getInitialGrid();
  }, []);

  // Step 2
  const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    if (node.isStart || node.isFinish) return grid;
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  const handleMouseDown = (row, col) => {
    if (isAnimating) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed || isAnimating) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  // Step 3
  const animateMinimumCostPath = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length - 1) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, ANIMATION_SPEED * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (!node.isStart && !node.isFinish) {
          const nodeElement = document.getElementById(`node-${node.row}-${node.col}-${graphtype}`);
          nodeElement.className = "node node-visited";
        }
      }, ANIMATION_SPEED * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    let totalCost = 0;
    
    // Calculate total cost excluding start node
    for (let i = 1; i < nodesInShortestPathOrder.length; i++) {
      totalCost += nodesInShortestPathOrder[i].cost;
    }
    
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if (!node.isStart && !node.isFinish) {
          const nodeElement = document.getElementById(`node-${node.row}-${node.col}-${graphtype}`);
          nodeElement.className = "node node-shortest-path";
        }
      }, ANIMATION_SPEED * i);
    }
    
    setTimeout(() => {
      if (nodesInShortestPathOrder.length <= 1) {
        answerRef.current.innerHTML = "Path not possible! 😕";
      } else {
        answerRef.current.innerHTML = `Found path with total cost: ${totalCost} ✨`;
      }
      setIsAnimating(false);
    }, ANIMATION_SPEED * nodesInShortestPathOrder.length);
  };

  const visualizeMinimumCostPath = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    if (START_NODE_ROW === FINISH_NODE_ROW && START_NODE_COL === FINISH_NODE_COL) {
      answerRef.current.innerHTML = "Start and Finish are at the same point! 🤔";
      setIsAnimating(false);
      return;
    }
    
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = minimumCostPath(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateMinimumCostPath(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  return (
    <div className={classes.container}>
      <BackButton />
      <div className={classes.heading}>Minimum Cost Path</div>
      
      <div className={classes.instructions}>
        Each cell has a cost (1-9). Click and drag to create walls. The algorithm will find the path from start to target with the minimum total cost.
      </div>

      <div className={classes.legend}>
        <div className={classes.legendItem}>
          <div className={`${classes.legendColor} ${classes.legendStart}`}></div>
          <span>Start Node</span>
        </div>
        <div className={classes.legendItem}>
          <div className={`${classes.legendColor} ${classes.legendEnd}`}></div>
          <span>Target Node</span>
        </div>
        <div className={classes.legendItem}>
          <div className={`${classes.legendColor} ${classes.legendWall}`}></div>
          <span>Wall</span>
        </div>
        <div className={classes.legendItem}>
          <div className={`${classes.legendColor} ${classes.legendPath}`}></div>
          <span>Minimum Cost Path</span>
        </div>
      </div>

      <div className={classes.grid}>
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx} className={classes.row}>
              {row.map((node, nodeIdx) => {
                const { row, col, isFinish, isStart, isWall, cost } = node;
                return (
                  <MinimumCostPathNode
                    key={nodeIdx}
                    col={col}
                    row={row}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                    onMouseUp={() => handleMouseUp()}
                    cost={cost}
                    graphtype={graphtype}
                    TOTAL_COL={TOTAL_COL}
                  ></MinimumCostPathNode>
                );
              })}
            </div>
          );
        })}
      </div>

      <div ref={answerRef} className={classes.answer}></div>

      <div className={classes.button}>
        <Button
          disabled={isAnimating}
          onClick={() => {
            refileGrid();
            getInitialGrid();
          }}
        >
          Reset Grid
        </Button>
        <Button
          disabled={isAnimating}
          onClick={() => {
            visualizeMinimumCostPath();
          }}
        >
          Find Minimum Cost Path
        </Button>
      </div>
    </div>
  );
};

export default MinimumCostPath;
