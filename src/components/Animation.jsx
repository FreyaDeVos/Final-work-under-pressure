import React from 'react';
import styles from './Animation.module.css';


const Animation = ({ src, alt = "Animated GIF" }) => {
  return (
    <div className={styles.animationContainer}>
      <img 
        src={src} 
        alt={alt} 
        className={styles.gif} 
      />
    </div>
  );
};

export default Animation;
