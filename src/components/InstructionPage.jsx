import React from 'react';
import PageIndicators from './PageIndicators';  // Zorg ervoor dat je deze component hebt
import ExitButton from './ExitButton';  // Zorg ervoor dat je deze component hebt
import styles from './InstructionPage.module.css';
import Animation from './Animation';
import Start from './Start';

const InstructionPage = ({ onNextPage }) => {
  return (
    <div className={styles.instructionPageContainer}>
      <PageIndicators totalPages={6} currentPage={1} onPageChange={() => {}} />
      <ExitButton onClick={() => alert('Exit!')} />
     <h1>instructions</h1>
     <div className={styles.animationInstructionContainer}>
        <Animation />
        <Animation />
      </div>
   <Start/>
    </div>
  );
};

export default InstructionPage;
