import React, { useState, useEffect, useCallback } from "react";
import Button from "../ui/Button";
import classes from "./NQueens.module.css";
import { BackButton } from "../ui/BackButton";
import { solveNQueens } from "./getNQueens";

const ANIMATION_SPEED = 500;
const MIN_BOARD_SIZE = 4;
const MAX_BOARD_SIZE = 8;

const NQueen = () => {
  const [boardSize, setBoardSize] = useState(4);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(ANIMATION_SPEED);
  const [solutions, setSolutions] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentSolution, setCurrentSolution] = useState(0);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const solve = useCallback(() => {
    const result = solveNQueens(boardSize);
    if (result.error) {
      setError(result.error);
      setSteps([]);
      setSolutions([]);
    } else {
      setError(null);
      setSteps(result.steps);
      setSolutions(result.solutions);
      setMessage(`Found ${result.solutions.length} solutions!`);
    }
    setCurrentStep(0);
    setCurrentSolution(0);
  }, [boardSize]);

  useEffect(() => {
    solve();
  }, [solve]);

  useEffect(() => {
    let timer;
    if (isPlaying && currentStep < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, speed);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length, speed]);

  const handleBoardSizeChange = (e) => {
    const size = parseInt(e.target.value);
    if (size >= MIN_BOARD_SIZE && size <= MAX_BOARD_SIZE) {
      setBoardSize(size);
      setError(null);
    } else {
      setError(`Board size must be between ${MIN_BOARD_SIZE} and ${MAX_BOARD_SIZE}`);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handleStepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleStepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleNextSolution = () => {
    if (currentSolution < solutions.length - 1) {
      setCurrentSolution(prev => prev + 1);
    }
  };

  const handlePrevSolution = () => {
    if (currentSolution > 0) {
      setCurrentSolution(prev => prev - 1);
    }
  };

  const renderBoard = (board) => {
    if (!board) return null;
    return (
      <div className={classes.board}>
        {board.map((row, i) => (
          <div key={i} className={classes.row}>
            {row.map((cell, j) => (
              <div 
                key={j} 
                className={`${classes.cell} ${(i + j) % 2 === 0 ? classes.white : classes.black}`}
              >
                {cell === 'Q' && (
                  <div className={classes.queen}>
                    ♕
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={classes.container}>
      <BackButton />
      <div className={classes.content}>
        <h1 className={classes.heading}>N-Queens Solver</h1>
        
        <div className={classes.controls}>
          <div className={classes.inputGroup}>
            <label>Board Size:</label>
            <input
              type="number"
              min={MIN_BOARD_SIZE}
              max={MAX_BOARD_SIZE}
              value={boardSize}
              onChange={handleBoardSizeChange}
            />
          </div>

          <div className={classes.inputGroup}>
            <label>Animation Speed:</label>
            <input
              type="range"
              min={100}
              max={1000}
              step={100}
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
            />
          </div>

          <div className={classes.buttonGroup}>
            <Button onClick={handleReset}>Reset</Button>
            <Button onClick={handleStepBackward}>⏪</Button>
            <Button onClick={handlePlayPause}>
              {isPlaying ? "⏸" : "▶"}
            </Button>
            <Button onClick={handleStepForward}>⏩</Button>
          </div>
        </div>

        {error ? (
          <div className={classes.error}>{error}</div>
        ) : (
          <>
            <div className={classes.message}>{message}</div>
            
            <div className={classes.visualizer}>
              <div className={classes.solutionViewer}>
                <h3>Current Solution</h3>
                <div className={classes.solutionControls}>
                  <Button onClick={handlePrevSolution} disabled={currentSolution === 0}>
                    Previous
                  </Button>
                  <span>Solution {currentSolution + 1} of {solutions.length}</span>
                  <Button 
                    onClick={handleNextSolution}
                    disabled={currentSolution === solutions.length - 1}
                  >
                    Next
                  </Button>
                </div>
                {solutions.length > 0 && renderBoard(solutions[currentSolution])}
              </div>

              <div className={classes.stepViewer}>
                <h3>Solution Steps</h3>
                <div className={classes.stepInfo}>
                  Step {currentStep + 1} of {steps.length}
                </div>
                {steps.length > 0 && (
                  <>
                    {renderBoard(steps[currentStep].board)}
                    <div className={classes.stepMessage}>
                      {steps[currentStep].message}
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NQueen;
