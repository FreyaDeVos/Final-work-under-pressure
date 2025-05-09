import React from 'react';
import PageIndicators from './PageIndicators';
import ExitButton from './ExitButton';
import Animation from './Animation';
import Start from './Start';
import styles from './LayoutGrid.module.css';
'./Animation.module.css';

const InstructionPage = ({ onNextPage }) => {
  return (
    <div className={styles.gridContainer}>
      {/* Header */}
      <div className={styles.header}>
        <PageIndicators totalPages={6} currentPage={1} onPageChange={() => {}} />
        <ExitButton onClick={() => alert('Exit!')} />
      </div>

      {/* Main content */}
      <div className={styles.mainContent}>
        <h1>Instructions</h1>
        <div className={styles.animationInstructionContainer}>
          <div className={styles.animationBlock}>
            <Animation />
            <p>Zet de koptelefoon op</p>
          </div>
          <div className={styles.animationBlock}>
            <Animation />
            <p>Doe de Polar meter om</p>
          </div>
        </div>
        <Start />
      </div>

      {/* Footer */}
      <div className={styles.footer}>
      
      </div>
    </div>
  );
};

export default InstructionPage;
