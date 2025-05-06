import React from 'react';
import styles from './Animation.module.css';

const Animation = () => {
  return (
    <div className={styles.animationContainer}>
    <img 
      src="/src/assets/video1.gif" 
      alt="Animated GIF" 
      className={styles.gif} 
    />
  </div>
);
  };

export default Animation;
