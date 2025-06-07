// InstructionPage.jsx
import React, { useState, useEffect } from 'react';
import PageIndicators from './PageIndicators';
import ExitButton from './ExitButton';
import InstructionCard from './InstructionCard';
import styles from './InstructionPage.module.css';
import finalKoptelefoon from '../assets/finalkoptelefoon.mp4';

const steps = [
  { id: 0, animation: finalKoptelefoon },
  { id: 1, animation: finalKoptelefoon },
  { id: 2, animation: finalKoptelefoon },
  { id: 3, animation: finalKoptelefoon },
  { id: 4, animation: finalKoptelefoon },
  { id: 5, animation: finalKoptelefoon },
];

const InstructionPage = ({ setCurrentPage }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  // Wanneer je op step 2 komt (na klikken op step 1), wacht dan 1.5s en ga naar NullPage
  useEffect(() => {
    if (currentStep === 2) {
      const timeout = setTimeout(() => {
        setCurrentPage(2); // Navigeer naar NullPage
      }, 1500);

      return () => clearTimeout(timeout); // Clean-up als je snel doorklikt
    }
  }, [currentStep, setCurrentPage]);

  return (
    <div className={styles.gridContainer}>
      {/* Header */}
      <div className={styles.header}>
        <PageIndicators totalPages={steps.length} currentPage={currentStep + 1} />
        <ExitButton onClick={() => setCurrentPage(0)} />
      </div>

      {/* Card area */}
      <div className={styles.mainContent}>
        <div className={styles.cardContainer}>
          {steps.map((step, index) => {
            let position = 'hidden';
            if (index === currentStep) position = 'center';
            else if (index === currentStep - 1) position = 'left';
            else if (index === currentStep + 1) position = 'right';

            return (
              <InstructionCard
                key={step.id}
                step={step}
                position={position}
                index={index}
              />
            );
          })}
        </div>
      {currentStep !== 2 && (
      <button className={styles.nextButton} onClick={nextStep}>VOLGENDE</button>)}
      </div>
    </div>
  );
};

export default InstructionPage;
