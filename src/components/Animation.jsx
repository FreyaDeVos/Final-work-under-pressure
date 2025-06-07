import React from 'react';
import styles from './Animation.module.css';

const Animation = ({ src }) => {
  return (
    <div className={styles.animationContainer}>
      <video
        className={styles.video}
        src={src}
        autoPlay
        loop
        playsInline
      >
        Je browser ondersteunt geen video.
      </video>
    </div>
  );
};

export default Animation;
