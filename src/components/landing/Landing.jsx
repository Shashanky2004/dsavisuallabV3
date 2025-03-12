import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Landing.module.css';

const Landing = () => {
  return (
    <div className={classes.landing}>
      <div className={classes.content}>
        <h1 className={classes.title}>DSA Visualizer</h1>
        <p className={classes.subtitle}>Interactive Learning Platform for Data Structures and Algorithms</p>
        
        <div className={classes.features}>
          <div className={classes.feature}>
            <div className={classes.featureIcon}>🎯</div>
            <h3>Visual Learning</h3>
            <p>Watch algorithms in action with step-by-step visualizations</p>
          </div>
          
          <div className={classes.feature}>
            <div className={classes.featureIcon}>⚡</div>
            <h3>Interactive Practice</h3>
            <p>Hands-on experience with sorting, graphs, and tree algorithms</p>
          </div>
          
          <div className={classes.feature}>
            <div className={classes.featureIcon}>🎮</div>
            <h3>Fun Challenges</h3>
            <p>Engage with interactive games like Minesweeper and 2048</p>
          </div>
        </div>

        <div className={classes.cta}>
          <Link to="/home" className={classes.ctaButton}>
            Start Exploring
            <span className={classes.arrow}>→</span>
          </Link>
        </div>
      </div>

      <div className={classes.waveContainer}>
        <div className={classes.wave}></div>
        <div className={classes.wave}></div>
        <div className={classes.wave}></div>
      </div>
    </div>
  );
};

export default Landing; 