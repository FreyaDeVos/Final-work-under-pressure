import React from 'react';
import PageIndicators from './PageIndicators';
import ExitButton from './ExitButton';
import styles from './LayoutGrid.module.css';

const Statistics1 = ({ setCurrentPage }) => {
  return (
    <div className={styles.gridContainer}>
      <div className={styles.header}>
        <PageIndicators totalPages={7} currentPage={3} onPageChange={() => {}} />
        <ExitButton onClick={() => setCurrentPage(0)} />
      </div>

      <div className={styles.mainContent}>
        {/* leeg of niks */}
      </div>

      <div className={styles.footer}>
        <button className={styles.nextButton} onClick={() => setCurrentPage(4)}>
          VOLGENDE
        </button>
      </div>
    </div>
  );
};

export default Statistics1;

