import React, { useState } from "react";
import { preorderTraversal } from "./getPreorderTraversal";
import styles from "../Tree.module.css";

const PreorderTraversal = () => {
  const [array, setArray] = useState([]);
  const [tree, setTree] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [message, setMessage] = useState("");

  const generateRandomArray = (size = 7) => {
    const newArray = Array.from({ length: size }, () =>
      Math.floor(Math.random() * 100)
    );
    setArray(newArray);
    generateTree(newArray);
    setMessage("");
  };

  const generateTree = (arr) => {
    const newTree = arr.map((value) => ({
      value,
      visited: false,
    }));
    setTree(newTree);
  };

  const handleVisualize = async () => {
    if (isAnimating) return;
    if (array.length === 0) {
      setMessage("Please generate a tree first");
      return;
    }
    
    setIsAnimating(true);
    setMessage("Traversing...");
    const animations = [];
    preorderTraversal(array, animations);
    
    for (let i = 0; i < animations.length; i++) {
      const idx = animations[i];
      await new Promise((resolve) => setTimeout(resolve, speed));
      setTree((prevTree) =>
        prevTree.map((node, index) => ({
          ...node,
          visited: index === idx ? true : node.visited,
        }))
      );
    }
    
    setIsAnimating(false);
    setMessage("Traversal complete!");
  };

  const handleReset = () => {
    setTree((prevTree) =>
      prevTree.map((node) => ({
        ...node,
        visited: false,
      }))
    );
    setMessage("");
  };

  const renderTreeLevel = (startIdx, count, level) => {
    const nodes = [];
    for (let i = 0; i < count && startIdx + i < tree.length; i++) {
      const node = tree[startIdx + i];
      nodes.push(
        <div key={startIdx + i} className={styles.nodeWrapper}>
          <div
            className={`common ${node.visited ? "visited" : "row_each_Element"}`}
          >
            {node.value}
          </div>
        </div>
      );
    }
    return (
      <div key={level} className={styles.treeLevel}>
        {nodes}
      </div>
    );
  };

  const renderTree = () => {
    const levels = [];
    let nodesInLevel = 1;
    let startIdx = 0;
    
    while (startIdx < tree.length) {
      levels.push(renderTreeLevel(startIdx, nodesInLevel, levels.length));
      startIdx += nodesInLevel;
      nodesInLevel *= 2;
    }
    
    return levels;
  };

  return (
    <div className={styles.Big_container}>
      <h1 className={styles.heading}>Preorder Traversal</h1>
      
      <div className={styles.description}>
        <h3>What is Preorder Traversal?</h3>
        <p>
          Preorder traversal is a way to visit all nodes in a binary tree following the order:
          <ol>
            <li>Visit the root node</li>
            <li>Traverse the left subtree</li>
            <li>Traverse the right subtree</li>
          </ol>
          This creates a sequence where each parent node appears before its children.
        </p>
      </div>

      <div className={styles.Trees}>
        <div className={styles.controls}>
          <button
            className={styles.button}
            onClick={() => generateRandomArray()}
            disabled={isAnimating}
          >
            🌳 Generate Tree
          </button>
          <button
            className={styles.button}
            onClick={handleVisualize}
            disabled={isAnimating || tree.length === 0}
          >
            {isAnimating ? '⏳ Traversing...' : '▶️ Start Traversal'}
          </button>
          <button
            className={styles.button}
            onClick={handleReset}
            disabled={isAnimating || tree.length === 0}
          >
            🔄 Reset
          </button>
          <div className={styles.speedControl}>
            <label>Animation Speed:</label>
            <input
              type="range"
              min="200"
              max="2000"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              disabled={isAnimating}
            />
            <span>{speed}ms</span>
          </div>
        </div>

        {message && (
          <div className={styles.message}>
            {message === "Traversing..." ? "⏳ " : "✅ "}
            {message}
          </div>
        )}

        <div className={styles.treeContainer}>
          {renderTree()}
        </div>

        <div className={styles.traversalOrder}>
          <h3>Traversal Order:</h3>
          <div className={styles.orderNodes}>
            {tree
              .filter((node) => node.visited)
              .map((node, index) => (
                <span key={index} className={styles.orderNode}>
                  {node.value}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreorderTraversal;
