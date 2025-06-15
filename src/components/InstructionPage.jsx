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
    animation: 'https://dl.dropboxusercontent.com/scl/fi/jv8jc6yhf9wyf3oa2b7q3/breath_v2.mp4?rlkey=61v1b7xd7upmuvm9xhgtajgz6&st=to82iv3y&dl=1',
    thumbnail: thumb2,
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
