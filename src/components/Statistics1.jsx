import React from 'react';
import PageIndicators from './PageIndicators'; 
import ExitButton from './ExitButton';  
import styles from './LayoutGrid.module.css';
import breath from '../assets/breath.gif';
import Animation from './Animation';

const Statistics1 = ({ onNextPage }) => {
  return (
    <div className={styles.gridContainer}>
      <div className={styles.header}>
        <PageIndicators totalPages={6} currentPage={3} onPageChange={() => {}} />
        <ExitButton onClick={() => alert('Exit!')} />
      </div>
      <div className={styles.mainContent}>
      <p>hier komt grafiek 
      </p>
      </div>
      <div className={styles.footer}>
      </div>
    </div>
  );
};

export default Statistics1;