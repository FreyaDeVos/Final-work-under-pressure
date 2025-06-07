import React, { useState, useEffect } from 'react';
import PageIndicators from './PageIndicators';
import ExitButton from './ExitButton';
import InstructionCard from './InstructionCard';
import styles from './InstructionPage.module.css';


const steps = [
  { id: 0, animation: 'https://www.dl.dropboxusercontent.com/scl/fi/wurtuifpxkw2qh69vnmah/finalkoptelefoon.mp4?rlkey=4e469vjzgpxnavtgo9tu7hcsq&st=utuqt22r' },
  { id: 1, animation: 'https://www.dl.dropboxusercontent.com/scl/fi/wbel7ulpxq4zvemwnicvm/finalPolarAandoen.mp4?rlkey=h5vpcbjdk4uzobohm7dswdwy0&st=veqzlj5w' },
  { id: 2, animation: 'https://www.dl.dropboxusercontent.com/scl/fi/vf2exihjvcj5xbwt8fm3h/ademinuitklein.mp4?rlkey=3q924w6njj5wksby488yypq9a&st=61v4ad6n' },
  { id: 3, animation: 'https://www.dl.dropboxusercontent.com/scl/fi/wurtuifpxkw2qh69vnmah/finalkoptelefoon.mp4?rlkey=4e469vjzgpxnavtgo9tu7hcsq&st=utuqt22r' },
  { id: 4, animation: 'https://www.dl.dropboxusercontent.com/scl/fi/wurtuifpxkw2qh69vnmah/finalkoptelefoon.mp4?rlkey=4e469vjzgpxnavtgo9tu7hcsq&st=utuqt22r' },
  { id: 5, animation: 'https://www.dl.dropboxusercontent.com/scl/fi/wurtuifpxkw2qh69vnmah/finalkoptelefoon.mp4?rlkey=4e469vjzgpxnavtgo9tu7hcsq&st=utuqt22r' },
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
