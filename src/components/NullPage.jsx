import React from 'react';
import PageIndicators from './PageIndicators'; 
import ExitButton from './ExitButton';  
import styles from './InstructionPage.module.css';
import Animation from './Animation';
import Start from './Start';

const NullPage = ({ onNextPage }) => {
  return (
    <div className={styles.instructionPageContainer}>
      <PageIndicators totalPages={6} currentPage={2} onPageChange={() => {}} />
      <ExitButton onClick={() => alert('Exit!')} />
     <h1>instructions</h1>
     <div className={styles.animationInstructionContainer}>
        <div className={styles.animationBlock}>
        <Animation />
        <p>zet de koptelefoon op</p>
        </div>
        <div className={styles.animationBlock}>
        <Animation />
        <p>zet de koptelefoon op</p>
        </div>
      </div>
         <Start/>
    </div>
  );
};

export default NullPage;