import React from 'react';
import PageIndicators from './PageIndicators';
import ExitButton from './ExitButton';
import styles from './LayoutGrid.module.css';
import P5Chart from './P5Chart';

const Statistics1 = ({ maxRMSSD, setCurrentPage }) => {
  return (
    <div className={styles.gridContainer}>
      <div className={styles.header}>
        <ExitButton onClick={() => setCurrentPage(0)} />
        <PageIndicators currentPage={3} />
      </div>

      <main className={styles.mainContent}>
        <h1>Statistieken</h1>

        {maxRMSSD !== null ? (
          <>
            <p>Hoogste RMSSD-waarde: {maxRMSSD.toFixed(2)}</p>
            <P5Chart maxRMSSD={maxRMSSD} />
          </>
        ) : (
          <p>Geen RMSSD-waarde beschikbaar</p>
        )}

        <button className={styles.nextButton} onClick={() => setCurrentPage(4)}>
          Volgende
        </button>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Statistics1;
