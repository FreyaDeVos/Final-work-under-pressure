import React from 'react';
import PageIndicators from './PageIndicators';  // Zorg ervoor dat je deze component hebt
import ExitButton from './ExitButton';  // Zorg ervoor dat je deze component hebt
import styles from './InstructionPage.module.css';

const InstructionPage = ({ onNextPage }) => {
  return (
    <div className={styles.instructionPageContainer}>
      {/* PageIndicators voor de tweede pagina */}
      <PageIndicators totalPages={6} currentPage={1} onPageChange={() => {}} />

      {/* ExitButton die altijd zichtbaar is */}
      <ExitButton onClick={() => alert('Exit!')} />
      <div className={styles.InstructionPage}>
        <h1>Instructies</h1>
      </div>
    </div>
  );
};

export default InstructionPage;
