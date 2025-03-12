import React from 'react';
import { Link } from 'react-router-dom';
import CodeEditor from './CodeEditor';
import classes from './Landing.module.css';

const Landing = () => {
  return (
    <div className={classes.landing}>
      <header className={classes.header}>
        <div className={classes.headerContent}>
          <div className={classes.logo}>
            <span className={classes.logoIcon}>⚡</span>
            <span className={classes.logoText}>DSA Visualizer</span>
          </div>
          <nav className={classes.nav}>
            <a href="#home" className={classes.navLink}>Home</a>
            <a href="#algorithms" className={classes.navLink}>Algorithms</a>
            <a href="#features" className={classes.navLink}>Features</a>
            <a href="#contact" className={classes.navLink}>Contact</a>
          </nav>
        </div>
      </header>

      <div className={classes.meshGrid}></div>
      <div className={classes.particles}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className={classes.particle}></div>
        ))}
      </div>
      <div className={classes.glowOrbs}>
        <div className={classes.glowOrb}></div>
        <div className={classes.glowOrb}></div>
        <div className={classes.glowOrb}></div>
      </div>
      <div className={classes.floatingElements}>
        <div className={classes.floatingElement}></div>
        <div className={classes.floatingElement}></div>
        <div className={classes.floatingElement}></div>
        <div className={classes.floatingElement}></div>
      </div>
      <div className={classes.content}>
        <section id="home" className={classes.hero}>
          <div className={classes.heroContent}>
            <h1 className={classes.title}>DSA Visualizer</h1>
            <p className={classes.subtitle}>Interactive Learning Platform for Data Structures and Algorithms</p>
            <div className={classes.cta}>
              <Link to="/home" className={classes.ctaButton}>
                Start Exploring
                <span className={classes.arrow}>→</span>
              </Link>
            </div>
          </div>
          <div className={classes.heroVisual}>
            <CodeEditor />
          </div>
        </section>

        <section id="features" className={classes.features}>
          <h2 className={classes.sectionTitle}>Why Choose DSA Visualizer?</h2>
          <div className={classes.featureGrid}>
            <div className={classes.feature}>
              <div className={classes.featureIcon}>🎯</div>
              <h3>Visual Learning</h3>
              <p>Watch algorithms in action with step-by-step visualizations and understand complex concepts easily</p>
            </div>
            
            <div className={classes.feature}>
              <div className={classes.featureIcon}>⚡</div>
              <h3>Interactive Practice</h3>
              <p>Hands-on experience with sorting, graphs, and tree algorithms. Learn by doing!</p>
            </div>
            
            <div className={classes.feature}>
              <div className={classes.featureIcon}>🎮</div>
              <h3>Fun Challenges</h3>
              <p>Engage with interactive games like Minesweeper and 2048 while learning core concepts</p>
            </div>

            <div className={classes.feature}>
              <div className={classes.featureIcon}>📊</div>
              <h3>Algorithm Analysis</h3>
              <p>Compare different algorithms and understand their time and space complexity</p>
            </div>
          </div>
        </section>

        <section id="algorithms" className={classes.algorithms}>
          <h2 className={classes.sectionTitle}>What You'll Learn</h2>
          <div className={classes.algorithmGrid}>
            <div className={classes.algorithmCard}>
              <h3>Sorting Algorithms</h3>
              <ul>
                <li>Bubble Sort</li>
                <li>Selection Sort</li>
                <li>Insertion Sort</li>
                <li>Merge Sort</li>
                <li>Quick Sort</li>
              </ul>
            </div>

            <div className={classes.algorithmCard}>
              <h3>Graph Algorithms</h3>
              <ul>
                <li>Breadth First Search</li>
                <li>Depth First Search</li>
                <li>Minimum Cost Path</li>
                <li>Dijkstra's Algorithm</li>
              </ul>
            </div>

            <div className={classes.algorithmCard}>
              <h3>Tree Traversals</h3>
              <ul>
                <li>Preorder Traversal</li>
                <li>Inorder Traversal</li>
                <li>Postorder Traversal</li>
                <li>Level Order Traversal</li>
              </ul>
            </div>

            <div className={classes.algorithmCard}>
              <h3>Problem Solving</h3>
              <ul>
                <li>N-Queens Problem</li>
                <li>Minesweeper Game</li>
                <li>2048 Game</li>
                <li>Equation Solver</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={classes.howItWorks}>
          <h2 className={classes.sectionTitle}>How It Works</h2>
          <div className={classes.steps}>
            <div className={classes.step}>
              <div className={classes.stepNumber}>1</div>
              <h3>Choose an Algorithm</h3>
              <p>Select from our collection of algorithms and data structures</p>
            </div>
            <div className={classes.step}>
              <div className={classes.stepNumber}>2</div>
              <h3>Visualize</h3>
              <p>Watch the algorithm in action with step-by-step visualization</p>
            </div>
            <div className={classes.step}>
              <div className={classes.stepNumber}>3</div>
              <h3>Interact</h3>
              <p>Adjust parameters and see how they affect the algorithm</p>
            </div>
            <div className={classes.step}>
              <div className={classes.stepNumber}>4</div>
              <h3>Learn</h3>
              <p>Understand the concepts through interactive examples</p>
            </div>
          </div>
        </section>

        <section id="contact" className={classes.contact}>
          <h2 className={classes.sectionTitle}>Connect With Me</h2>
          <div className={classes.socialLinks}>
            <a 
              href="https://www.linkedin.com/in/shashank-ba0944274/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={classes.socialLink}
            >
              <svg className={classes.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
            <a 
              href="https://github.com/Shashanky2004" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={classes.socialLink}
            >
              <svg className={classes.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a 
              href="https://www.instagram.com/_sha.sha.nk_yadav/?hl=en" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={classes.socialLink}
            >
              <svg className={classes.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.012-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Instagram
            </a>
            <a 
              href="https://shashankyportfolio.netlify.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={classes.socialLink}
            >
              <svg className={classes.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-17.208a2 2 0 1 1 4 0 2 2 0 0 1-4 0zM9.5 8.5v10h5v-10h-5zm6.5 0h-1.5v10h1.5v-10z"/>
              </svg>
              Portfolio
            </a>
          </div>
          <div className={classes.contactInfo}>
            <p className={classes.email}>📧 shashankbtech2004@gmail.com</p>
            <p className={classes.location}>📍 New Delhi, India</p>
          </div>
        </section>
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