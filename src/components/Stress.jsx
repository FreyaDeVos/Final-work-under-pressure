import React from 'react';
import PageIndicators from './PageIndicators'; 
import ExitButton from './ExitButton';  
import styles from './LayoutGrid.module.css';
import Animation from './Animation';

const Stress = ({ onNextPage }) => {
  return (
    <div className={styles.gridContainer}>
      <div className={styles.header}>
        <PageIndicators totalPages={6} currentPage={4} onPageChange={() => {}} />
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

export default Stress;