import React from 'react';
import classes from './CodeEditor.module.css';

const CodeEditor = () => {
  return (
    <div className={classes.editorContainer}>
      <div className={classes.editorHeader}>
        <div className={classes.buttons}>
          <span className={classes.button}></span>
          <span className={classes.button}></span>
          <span className={classes.button}></span>
        </div>
        <div className={classes.headerEmojis}>
          <span className={classes.emoji}>🚀</span>
          <span className={classes.emoji}>💻</span>
          <span className={classes.emoji}>⚡</span>
          <span className={classes.emoji}>🎯</span>
        </div>
      </div>
      <div className={classes.editorContent}>
        <div className={classes.lineNumbers}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
          <span>9</span>
          <span>10</span>
        </div>
        <div className={classes.code}>
          <div className={classes.line}>
            <span className={classes.keyword}>function</span>{' '}
            <span className={classes.function}>preorderTraversal</span>
            <span className={classes.bracket}>(root)</span> {'{'}
            <span className={classes.inlineEmoji}>🌳</span>
          </div>
          <div className={classes.line}>
            <span className={classes.keyword}>if</span> (
            <span className={classes.variable}>!root</span>) <span className={classes.keyword}>return</span>;
            <span className={classes.inlineEmoji}>❌</span>
          </div>
          <div className={classes.line}>
            <span className={classes.comment}>// Visit root</span>
            <span className={classes.inlineEmoji}>📍</span>
          </div>
          <div className={classes.line}>
            <span className={classes.function}>console</span>.
            <span className={classes.function}>log</span>(
            <span className={classes.variable}>root</span>.
            <span className={classes.property}>val</span>);
            <span className={classes.inlineEmoji}>📝</span>
          </div>
          <div className={classes.line}>
            <span className={classes.comment}>// Traverse left subtree</span>
            <span className={classes.inlineEmoji}>⬅️</span>
          </div>
          <div className={classes.line}>
            <span className={classes.function}>preorderTraversal</span>(
            <span className={classes.variable}>root</span>.
            <span className={classes.property}>left</span>);
            <span className={classes.inlineEmoji}>👈</span>
          </div>
          <div className={classes.line}>
            <span className={classes.comment}>// Traverse right subtree</span>
            <span className={classes.inlineEmoji}>➡️</span>
          </div>
          <div className={classes.line}>
            <span className={classes.function}>preorderTraversal</span>(
            <span className={classes.variable}>root</span>.
            <span className={classes.property}>right</span>);
            <span className={classes.inlineEmoji}>👉</span>
          </div>
          <div className={classes.line}>{'}'}<span className={classes.inlineEmoji}>✨</span></div>
        </div>
      </div>
      <div className={classes.cursor}></div>
    </div>
  );
};

export default CodeEditor; 