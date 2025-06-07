import React, { useState, useEffect } from 'react';
import PageIndicators from './PageIndicators';
import ExitButton from './ExitButton';
import styles from './InstructionPage.module.css';

function Stress({ setCurrentPage }) {
    return (
     <div className={styles.gridContainer}>
      <div className={styles.header}>
        <PageIndicators totalPages={7} currentPage={3} />
        <ExitButton onClick={() => setCurrentPage(0)} />
      </div>

      <div className={styles.mainContent}>
        <h2>Live Statistieken</h2>
        <p>❤️ Hartslag: {hr} bpm</p>
        <p>🧠 RR-intervallen: {rrIntervals.join(', ') || 'Geen data'}</p>
        <p>💓 HRV (RMSSD): {hrvScore}</p>

        {timerEnded && (
          <div>
            <h3>Rustigste waarde in 40 seconden</h3>
          </div>
        )}
        <button className={styles.nextButton} onClick={nextStep}>VOLGENDE</button>
      </div>

      <div className={styles.footer}></div>
    </div>
    )
}

export default Stress;