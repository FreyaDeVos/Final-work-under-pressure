import React, { useState, useEffect } from 'react';
import PageIndicators from './PageIndicators';
import ExitButton from './ExitButton';
import InstructionCard from './InstructionCard';
import styles from './InstructionPage.module.css';


import thumb0 from '../assets/koptelefoonimage.png';
import thumb1 from '../assets/polarimage.png';
import thumb2 from '../assets/breathimage.png';

const steps = [
  { 
    id: 0, 
    animation: 'https://www.dl.dropboxusercontent.com/scl/fi/tohzccmykj47c93zxu017/finalkoptelefoon.mp4?rlkey=nixu9olop3m368m6naqa5j3x7&st=qf15xvvi',
    thumbnail: thumb0,
  },
  { 
    id: 1, 
    animation: 'https://www.dl.dropboxusercontent.com/scl/fi/k14rec00487zm6pby1xlh/finalPolarAandoen_2.mp4?rlkey=dsogyc059bsonjymqha8oq74p&st=6b92wvx3',
    thumbnail: thumb1,
  },
  { 
    id: 2, 
    animation: 'https://www.dl.dropboxusercontent.com/scl/fi/nkvyjm94umhnsk96f8yty/breath.mp4?rlkey=3m0x4qfpe6phyhuo8cc9jmgq3&st=5oxzto6h',
    thumbnail: thumb2,
  },
    { 
    id: 3, 
    thumbnail: 'https://dl.dropboxusercontent.com/scl/fi/ntq75orq6xnaix1z65he1/statimage.png?rlkey=1tivnsl552pom5sc2tqhcfb0p&st=051qlyoi&dl=1',
  },
];

const InstructionPage = ({ setCurrentPage }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const [fade, setFade] = useState(false);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  
    useEffect(() => {
  if (currentStep === 2) {
    const visibleTimeout = setTimeout(() => {
      setFade(true); // 
      const fadeTimeout = setTimeout(() => {
        setCurrentPage(2); 
      }, 1000); 
      return () => clearTimeout(fadeTimeout);
    }, 2200); 

    return () => clearTimeout(visibleTimeout);
  }
}, [currentStep, setCurrentPage]);
  return (
    <div className={styles.gridContainer}>
      <div className={styles.header}>
      {(currentStep === 0 || currentStep === 1) && (<PageIndicators totalPages={8} currentPage={1} />)}
        <ExitButton onClick={() => setCurrentPage(0)} />
      </div>
      <div className={`${styles.mainContent} ${fade ? styles.fadeOut : ''}`}>
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
            /> );})}</div>
      {currentStep !== 2 && (
      <button className={styles.nextButton} onClick={nextStep}>VOLGENDE</button>)}
      </div>
    </div>
  );
};

export default InstructionPage;
