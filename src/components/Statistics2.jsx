import React from 'react';
import PageIndicators from './PageIndicators';
import ExitButton from './ExitButton';
import styles from './LayoutGrid.module.css';
import P5Chart from './P5Chart';
import StressLegend from './StressLegend';

const Statistics2 = ({ setCurrentPage }) => {
  return (
    <div className={styles.gridContainer}>
      <div className={styles.header}>
        <PageIndicators totalPages={8} currentPage={6} />
        <ExitButton onClick={() => setCurrentPage(0)} />
      </div>

      <div className={styles.mainContent}>
        <h1>STRESSLEVEL IN DRUKTE</h1>
              <StressLegend />
           <button className={styles.nextButton} onClick={() => setCurrentPage(7)}>
          VOLGENDE
        </button>
      </div>
    </div>
  );
};

export default Statistics2;

