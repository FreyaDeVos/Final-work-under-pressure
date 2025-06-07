import React, { useState } from 'react';
import PageIndicators from './PageIndicators';
import ExitButton from './ExitButton';
import styles from './InstructionPage.module.css';

function Ending ({ setCurrentPage }) {
      const nextStep = () => {
    setCurrentPage(0); // of een andere pagina waar je naartoe wil navigeren
  };
    return (
     <div className={styles.gridContainer}>
      <div className={styles.header}>
           <PageIndicators totalPages={7} currentPage={6} />
        <ExitButton onClick={() => setCurrentPage(0)} />
      </div>
      <div className={styles.mainContent}>
        <h2>Ending</h2>
        <button className={styles.nextButton} onClick={nextStep}>VOLGENDE</button>
      </div>
      <div className={styles.footer}></div>
    </div>
    )
}

export default Ending;