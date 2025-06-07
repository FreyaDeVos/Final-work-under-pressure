import React, { useState } from 'react';
import ExitButton from './ExitButton';
import PageIndicators from './PageIndicators';
import styles from './LayoutGrid.module.css';

function StatisticsPage({ setCurrentPage }) {

  const nextStep = () => {
    setCurrentPage(4); // of een andere pagina waar je naartoe wil navigeren
  };

  return (
    <div className={styles.gridContainer}>
      <div className={styles.header}>
        <PageIndicators totalPages={7} currentPage={3} />
        <ExitButton onClick={() => setCurrentPage(0)} />
      </div>

      <div className={styles.mainContent}>
        <h2>Live Statistieken</h2>
        <button className={styles.nextButton} onClick={nextStep}>VOLGENDE</button>
      </div>

      <div className={styles.footer}></div>
    </div>
  );
}

export default StatisticsPage;
