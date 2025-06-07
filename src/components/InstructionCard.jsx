import React from 'react';
import styles from './InstructionCard.module.css';
import frameImage from '../assets/card-frame.png';

const InstructionCard = ({ step, position, index }) => {
  return (
    <div className={`${styles.card} ${styles[position]}`} data-index={index}>
      <div className={styles.mediaBox}>
        {step.animation.endsWith('.mp4') ? (
          <video className={styles.media} src="https://dl.dropboxusercontent.com/scl/fi/wurtuifpxkw2qh69vnmah/finalkoptelefoon.mp4?rlkey=4e469vjzgpxnavtgo9tu7hcsq&st=0dnvacur
" autoPlay loop muted />
        ) : (
        <video className={styles.media} src="https://dl.dropboxusercontent.com/scl/fi/wurtuifpxkw2qh69vnmah/finalkoptelefoon.mp4?rlkey=4e469vjzgpxnavtgo9tu7hcsq&st=0dnvacur
" autoPlay loop muted />
        )}
        <video className={styles.media} src="https://dl.dropboxusercontent.com/scl/fi/wurtuifpxkw2qh69vnmah/finalkoptelefoon.mp4?rlkey=4e469vjzgpxnavtgo9tu7hcsq&st=0dnvacur
" autoPlay loop muted />"
      </div>
      <p className={styles.text}>{step.text}</p>
    </div>
  );
};

export default InstructionCard;
