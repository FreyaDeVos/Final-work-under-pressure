import React, { useState } from 'react';
import PageIndicators from './PageIndicators';
import ExitButton from './ExitButton';
import styles from './InstructionPage.module.css';

function Statistics2 ({ setCurrentPage }) {
      const nextStep = () => {
    setCurrentPage(6); // of een andere pagina waar je naartoe wil navigeren
  };
    return (
     <div className={styles.gridContainer}>
      <div className={styles.header}>
        <PageIndicators totalPages={7} currentPage={5} />
        <ExitButton onClick={() => setCurrentPage(0)} />
      </div>

      <div className={styles.mainContent}>
        <h2>stat2</h2>
        <button className={styles.nextButton} onClick={nextStep}>VOLGENDE</button>
      </div>

      <div className={styles.footer}></div>
    </div>
    )
}

export default Statistics2;