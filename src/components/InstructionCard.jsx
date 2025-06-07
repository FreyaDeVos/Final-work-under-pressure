import React from 'react';
import styles from './InstructionCard.module.css';
import frameImage from '../assets/card-frame.png';

const InstructionCard = ({ step, position }) => {
  return (
    <div className={`${styles.card} ${styles[position]}`}>
      <video
        className={styles.video}
        src={step.animation}
        autoPlay
        muted
        loop
        playsInline
      /><img src={frameImage} alt="frame" className={styles.frame} />
    </div>
  );
};

export default InstructionCard;
