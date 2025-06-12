import React from 'react';
import PageIndicators from './PageIndicators';
import ExitButton from './ExitButton';
import styles from './LayoutGrid.module.css';
import P5Chart from './P5Chart';
import StressLegend from './StressLegend';

const Statistics1 = ({ maxRMSSD, setCurrentPage }) => {
  const averageRMSSD = 42; 
  return (
    <div className={styles.gridContainer}>
      <div className={styles.header}>
        <PageIndicators totalPages={7} currentPage={4} />
        <ExitButton onClick={() => setCurrentPage(0)} />
      </div>

      <main className={styles.mainContent}>
        <h1>Stresslevel in rust</h1>
        <StressLegend />

        <div className={styles.chartGrid}>
          <div className={styles.chartRow}>
            <p className={styles.chartLabel}>ik</p>
            {maxRMSSD !== null ? (
              <P5Chart maxRMSSD={maxRMSSD} />
            ) : (
              <p>Geen RMSSD-waarde beschikbaar</p>
            )}
          </div>

          <div className={styles.chartRow}>
            <p className={styles.chartLabel}>gemiddelde in rust</p>
            <P5Chart maxRMSSD={averageRMSSD} />
          </div>
        </div>
        <button className={styles.nextButton} onClick={() => setCurrentPage(4)}>
          Volgende
        </button>
      </main>
    </div>
  );
};

export default Statistics1;
