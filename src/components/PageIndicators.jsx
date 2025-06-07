import React from 'react';
import styles from './PageIndicators.module.css';
import active from '../assets/indicator-active.png';
import inactive from '../assets/indicator-inactive.png';

function PageIndicators({ totalPages, currentPage }) {
  return (
    <div className={styles.indicatorContainer}>
      {Array.from({ length: totalPages }, (_, i) => (
        <img
  key={i}
  className={styles.dot}
  src={i === currentPage ? active : inactive}
  alt={`Page ${i + 1}`}
/>
      ))}
    </div>
  );
}

export default PageIndicators;
