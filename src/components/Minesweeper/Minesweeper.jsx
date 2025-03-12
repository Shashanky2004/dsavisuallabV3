import React, { useState, useEffect } from "react";
import classes from "./Minesweeper.module.css";
import Button from "../ui/Button";
import { BackButton } from "../ui/BackButton";
import MinesweeperNode from "./MinesweeperNode";
import { getMinesweeper, createInitialBoard } from "./getMinesweeper";

const Minesweeper = () => {
  const TOTAL_ROW = 15;
  const TOTAL_COL = 45;
  const [grid, setGrid] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [message, setMessage] = useState("");
  const [mineCount, setMineCount] = useState(0);
  const [flagCount, setFlagCount] = useState(0);
  const [isFirstClick, setIsFirstClick] = useState(true);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Calculate responsive grid size
  const getGridSize = () => {
    const width = window.innerWidth;
    if (width < 480) {
      return { rows: 10, cols: 15 };
    }
    if (width < 768) {
      return { rows: 12, cols: 20 };
    }
    if (width < 1024) {
      return { rows: 15, cols: 30 };
    }
    return { rows: TOTAL_ROW, cols: TOTAL_COL };
  };

  const getInitialGrid = () => {
    const { rows, cols } = getGridSize();
    const newGrid = createInitialBoard(rows, cols);
    
    // Add row and col properties to each cell
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        newGrid[row][col].row = row;
        newGrid[row][col].col = col;
      }
    }
    
    // Count initial mines
    const mines = newGrid.reduce((count, row) => 
      count + row.filter(cell => cell.isMine).length, 0);
    
    setGrid(newGrid);
    setMineCount(mines);
    setFlagCount(0);
    setGameOver(false);
    setWon(false);
    setMessage("");
    setIsFirstClick(true);
    setTimer(0);
    setIsTimerRunning(false);
  };

  useEffect(() => {
    getInitialGrid();
  }, []);

  // Timer effect
  useEffect(() => {
    let interval;
    if (isTimerRunning && !gameOver && !won) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, gameOver, won]);

  // Add window resize handler
  useEffect(() => {
    const handleResize = () => {
      if (!gameOver && !won) {
        getInitialGrid();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [gameOver, won]);

  const handleCellClick = (row, col, action = 'reveal') => {
    if (gameOver || won) return;

    if (isFirstClick) {
      setIsFirstClick(false);
      setIsTimerRunning(true);
    }

    const { board, gameOver: isGameOver, won: hasWon, message: newMessage } = 
      getMinesweeper(grid, row, col, action);

    setGrid([...board]);
    setGameOver(isGameOver);
    setWon(hasWon);
    setMessage(newMessage);

    // Update flag count
    if (action === 'flag') {
      setFlagCount(prev => prev + (board[row][col].isFlagged ? 1 : -1));
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={classes.container}>
      <BackButton />
      <div className={classes.content}>
        <h1 className={classes.heading}>Minesweeper</h1>
        
        <div className={classes.gameInfo}>
          <div className={classes.infoBox}>
            <span className={classes.label}>Mines:</span>
            <span className={classes.value}>{mineCount - flagCount}</span>
          </div>
          <div className={classes.infoBox}>
            <span className={classes.label}>Time:</span>
            <span className={classes.value}>{formatTime(timer)}</span>
          </div>
        </div>

        <div className={classes.message}>{message}</div>

        <div className={classes.grid}>
          {grid.map((row, rowIdx) => (
            <div key={rowIdx} className={classes.row}>
              {row.map((node, nodeIdx) => (
                <MinesweeperNode
                  key={nodeIdx}
                  col={node.col}
                  row={node.row}
                  distance={node.distance}
                  isMine={node.isMine}
                  isRevealed={node.isRevealed}
                  isFlagged={node.isFlagged}
                  onClick={(e) => {
                    if (e.type === 'contextmenu') {
                      e.preventDefault();
                      handleCellClick(node.row, node.col, 'flag');
                    } else {
                      handleCellClick(node.row, node.col, 'reveal');
                    }
                  }}
                  TOTAL_COL={getGridSize().cols}
                />
              ))}
            </div>
          ))}
        </div>

        <div className={classes.controls}>
          <Button onClick={getInitialGrid}>
            New Game
          </Button>
        </div>

        <div className={classes.instructions}>
          <h3>How to Play:</h3>
          <ul>
            <li>Left click to reveal a cell</li>
            <li>Right click to flag/unflag a mine</li>
            <li>Numbers show how many mines are adjacent to each cell</li>
            <li>Flag all mines and reveal all safe cells to win</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Minesweeper;
