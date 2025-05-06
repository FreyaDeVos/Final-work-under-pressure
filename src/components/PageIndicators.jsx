import React from 'react';
import styles from './PageIndicators.module.css';

// './PageIndicators.module.css';

function PageIndicators({ totalPages, currentPage, onPageChange }) {
  return (
    <div className={styles.indicatorContainer}>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => onPageChange?.(index)}
          className={`${styles.dot} ${currentPage === index ? styles.active : ''}`}
          aria-label={`Ga naar pagina ${index + 1}`}
          aria-current={currentPage === index ? 'page' : undefined}
        />
      ))}
    </div>
  );
}

export default PageIndicators;
