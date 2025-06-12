import React from 'react';
import PageIndicators from './PageIndicators';
import ExitButton from './ExitButton';
import styles from './LayoutGrid.module.css';
import P5Chart from './P5Chart';
import StressLegend from './StressLegend';


const Statistics1 = ({ maxRMSSD, setCurrentPage }) => {
  return (
    <div className={styles.gridContainer}>
      <div className={styles.header}>
        <PageIndicators totalPages={7} currentPage={4} />
        <ExitButton onClick={() => setCurrentPage(0)} />
      </div>

      <main className={styles.mainContent}>
        <h1>Stresslevel in rust</h1><StressLegend />
        {maxRMSSD !== null ? (
          <><P5Chart maxRMSSD={maxRMSSD} /></>
        ) : (
          <p>Geen RMSSD-waarde beschikbaar</p>
        )}
        <button className={styles.nextButton} onClick={() => setCurrentPage(4)}>Volgende
        </button>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Statistics1;
