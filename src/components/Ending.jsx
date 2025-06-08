import React, { useState } from 'react';
import PageIndicators from './PageIndicators';
import ExitButton from './ExitButton';
import styles from './LayoutGrid.module.css'
import Animation from './Animation';

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
         <div className={styles.fullscreenBackground}>``
       <Animation src="https://dl.dropboxusercontent.com/scl/fi/fvd0wrr6yhkaj7y3bgxgm/ending.mp4?rlkey=ga2olgd29b2o6ip4os86iy6o5&st=ewjstr0t" />
      </div>
        <button className={styles.nextButton} onClick={nextStep}>Einde</button>
 
      </div>
      <div className={styles.footer}></div>
    
    </div>
    )
}

export default Ending;