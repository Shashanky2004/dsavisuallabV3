import React, { useState, useEffect, useRef } from "react";
import { solveEquation } from "./getsolveEquation";
import Button from "../ui/Button";
import classes from "./EquationSolve.module.css";
import { BackButton } from "../ui/BackButton";

const EXAMPLE_EQUATIONS = [
  { equation: "2+2/2", description: "Basic arithmetic" },
  { equation: "sin(pi/2)", description: "Trigonometric functions" },
  { equation: "2^3 + sqrt(16)", description: "Powers and roots" },
  { equation: "log(100) + ln(e)", description: "Logarithms" },
  { equation: "2.5e3 + 1.2e-2", description: "Scientific notation" },
];

const MAX_HISTORY = 10;

const EquationSolve = () => {
  const ANIMATION_SPEED = 300;
  const [equation, setEquation] = useState("2+2/2");
  const [answer, setAnswer] = useState("3");
  const [animations, setAnimations] = useState([]);
  const [history, setHistory] = useState([]);
  const [showExamples, setShowExamples] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        getEquationSolve();
      } else if (e.key === "ArrowUp" && history.length > 0) {
        e.preventDefault();
        setEquation(history[history.length - 1].equation);
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [history]);

  const getEquationSolve = () => {
    if (!equation.trim()) {
      setError("Please enter an equation");
      return;
    }

    setError(null);
    const { result, animation } = solveEquation(equation);
    
    if (result.startsWith("Error:")) {
      setError(result);
      return;
    }

    // Add to history
    setHistory(prev => {
      const newHistory = [...prev, { equation, result, timestamp: new Date() }];
      if (newHistory.length > MAX_HISTORY) {
        newHistory.shift();
      }
      return newHistory;
    });

    // Animate solution steps
    setAnimations([]);
    for (let i = 0; i < animation.length; i++) {
      setTimeout(() => {
        setAnimations(prev => [...prev, animation[i]]);
      }, ANIMATION_SPEED * i);
    }
    setAnswer(result);
  };

  const handleExampleClick = (example) => {
    setEquation(example.equation);
    setShowExamples(false);
    inputRef.current?.focus();
  };

  return (
    <div className={classes.container}>
      <BackButton />
      <div className={classes.box}>
        <div className={classes.heading}>Equation Solver</div>
        
        <div className={classes.instructions}>
          <p>Enter a mathematical equation to solve. Supports:</p>
          <ul>
            <li>Basic arithmetic (+, -, *, /, ^)</li>
            <li>Functions (sin, cos, tan, log, ln, sqrt, abs)</li>
            <li>Constants (pi, e)</li>
            <li>Scientific notation (1.2e3)</li>
          </ul>
          <p>Press Enter to solve, Up Arrow for previous equation</p>
        </div>

        <div className={classes.equation}>
          <div className={classes.inputWrapper}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Enter equation (e.g. 2+2/2)"
              onChange={(e) => setEquation(e.target.value)}
              value={equation}
              className={error ? classes.error : ""}
            />
            <button 
              className={classes.examplesButton}
              onClick={() => setShowExamples(!showExamples)}
            >
              Examples
            </button>
          </div>

          {showExamples && (
            <div className={classes.examples}>
              {EXAMPLE_EQUATIONS.map((example, index) => (
                <div 
                  key={index}
                  className={classes.example}
                  onClick={() => handleExampleClick(example)}
                >
                  <span className={classes.exampleEquation}>{example.equation}</span>
                  <span className={classes.exampleDescription}>{example.description}</span>
                </div>
              ))}
            </div>
          )}

          {error && <div className={classes.errorMessage}>{error}</div>}

          <div className={classes.submitbutton}>
            <Button onClick={getEquationSolve}>Solve</Button>
          </div>

          <div className={classes.answer}>
            Result: <span className={classes.result}>{answer}</span>
          </div>
        </div>
      </div>

      <div className={classes.animations_box}>
        <div className={classes.headStep}>Solution Steps</div>
        <div className={classes.animations}>
          {animations.map((animation, index) => (
            <div 
              className={classes.animation} 
              key={index}
              style={{
                animationDelay: `${index * 0.3}s`,
                opacity: index === animations.length - 1 ? 1 : 0.7
              }}
            >
              Step {index + 1}: {animation}
            </div>
          ))}
        </div>
      </div>

      {history.length > 0 && (
        <div className={classes.history}>
          <div className={classes.headStep}>History</div>
          <div className={classes.historyList}>
            {history.slice().reverse().map((item, index) => (
              <div 
                key={index} 
                className={classes.historyItem}
                onClick={() => setEquation(item.equation)}
              >
                <div className={classes.historyEquation}>{item.equation}</div>
                <div className={classes.historyResult}>= {item.result}</div>
                <div className={classes.historyTime}>
                  {item.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EquationSolve;
