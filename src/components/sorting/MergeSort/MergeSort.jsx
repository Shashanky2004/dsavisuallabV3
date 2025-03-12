import React from "react";
import classes from "../Sort.module.css";
import Button from "../../ui/Button";
import { getMergeSortAnimations } from "./getMergeSortAnimations";
import { useState, useEffect } from "react";
import { BackButton } from "../../ui/BackButton";

const MergeSort = () => {
  const ANIMATION_SPEED = 50;
  const NUMBER_OF_BAR = 35;
  const SECONDARY_COLOR = "#707070";
  const PRIMARY_COLOR = "white";
  const [array, setArray] = useState([40, 70, 50]);
  const [isAnimating, setIsAnimating] = useState(false);
  const max = 100;
  const min = 5;

  // Cleanup function for animations
  useEffect(() => {
    return () => {
      // Clear any ongoing animations when component unmounts
      const elements = document.getElementsByClassName(classes.arraybar);
      for (let element of elements) {
        element.style.backgroundColor = PRIMARY_COLOR;
      }
    };
  }, []);

  const mergeSort = () => {
    if (isAnimating) return; // Prevent multiple sorts at once
    setIsAnimating(true);

    const animations = getMergeSortAnimations(array);
    const arrayBars = document.getElementsByClassName(classes.arraybar);
    
    const animationPromises = [];

    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;

      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        
        const promise = new Promise(resolve => {
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
            resolve();
          }, i * ANIMATION_SPEED);
        });
        animationPromises.push(promise);
      } else {
        const [barOneIdx, newHeight] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        
        const promise = new Promise(resolve => {
          setTimeout(() => {
            arrayBars[barOneIdx].innerHTML = newHeight;
            barOneStyle.height = `${newHeight * (window.innerHeight / 125)}px`;
            resolve();
          }, i * ANIMATION_SPEED);
        });
        animationPromises.push(promise);
      }
    }

    // When all animations are done
    Promise.all(animationPromises).then(() => {
      setIsAnimating(false);
    });
  };

  const GenerateNumber = () => {
    if (isAnimating) return; // Prevent generation during animation
    
    const generateArray = [];
    for (let i = 0; i < NUMBER_OF_BAR; i++) {
      generateArray.push(Math.floor(Math.random() * (max - min + 1) + min));
    }
    setArray(generateArray);
  };

  return (
    <div className={classes.container}>
      <BackButton />
      <div className={classes.heading}>Merge Sort</div>
      <div className={classes.array}>
        {array.map((value, index) => (
          <div
            className={classes.arraybar}
            key={index}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value * (window.innerHeight / 125)}px`,
              width: `${window.innerWidth / (2.2 * array.length)}px`,
              fontSize: `${window.innerWidth / (3.3 * array.length)}px`,
            }}
          >
            {value}
          </div>
        ))}
      </div>
      <div className={classes.button}>
        <Button
          onClick={GenerateNumber}
          disabled={isAnimating}
        >
          Generate number
        </Button>
        <Button
          onClick={mergeSort}
          disabled={isAnimating}
        >
          MergeSort
        </Button>
      </div>
    </div>
  );
};

export default MergeSort;
