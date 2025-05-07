import React from 'react';
import PageIndicators from './PageIndicators'; 
import ExitButton from './ExitButton';  
import styles from './LayoutGrid.module.css';
import Start from './Start';


const NullPage = ({ onNextPage }) => {
  return (
    <div className={styles.gridContainer}>
      
      <div className={styles.header}>
        <PageIndicators totalPages={6} currentPage={2} onPageChange={() => {}} />
        <ExitButton onClick={() => alert('Exit!')} />
      </div>

  
      <div className={styles.mainContent}>
      <p>adem in en uit</p>
      <p>cirkels in en uit</p>
      <p>tijdsbalk bovenaan + blur an page indicators</p>
      <p>pijl moet weg </p>
      </div>

     
      <div className={styles.footer}>
      
      </div>
    </div>
  );
};


export default NullPage;