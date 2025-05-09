import React from 'react';

import ExitButton from './ExitButton';  
import styles from './LayoutGrid.module.css';
import Animation from './Animation';
import breath from '../assets/breath.gif';
import time from '../assets/time.gif';



const NullPage = ({ onNextPage }) => {
  return (
    <div className={styles.gridContainer}>
      
      <div className={styles.header}>
          <div className={styles.animationBlockTimeline}>
            <Animation src={time}/>
          </div>
        <ExitButton onClick={() => alert('Exit!')} />
      </div>
      <div className={styles.mainContent}>
      <div className={styles.animationBreath}>
      <Animation src={breath} />
      </div>
  
      </div>
      <div className={styles.footer}>
      </div>
    </div>
  );
};


export default NullPage;