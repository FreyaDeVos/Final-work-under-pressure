import React from 'react';
import styles from './NextArrow.module.css';

const NextArrow = ({ onClick }) => {
  return (
    <div onClick={onClick} className={styles.arrowContainer}>
      < div className={styles.arrow}>→</div>{/* Of gebruik een icoon */}
    </div>
  );
};

export default NextArrow;
