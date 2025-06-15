import React from 'react';
import styles from './InstructionCard.module.css';


const InstructionCard = ({ step, position }) => {
  return (
    <div className={`${styles.card} ${styles[position]}`}>
      {position === 'center' ? (
        <video
          className={styles.video}
          src={step.animation}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
       
        <img
          src={step.thumbnail}
          alt="thumbnail"
          className={styles.thumbnail}
        />
      )}
    </div>
  );
};

export default InstructionCard;
