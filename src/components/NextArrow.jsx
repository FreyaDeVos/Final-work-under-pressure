import React from 'react';
import styles from './NextArrow.module.css';

const NextArrow = ({ onClick }) => {
  return (
    <div className={styles.arrowContainer} onClick={onClick}>
      <span className={styles.arrow}>→</span>
    </div>
  );
};

export default NextArrow;
