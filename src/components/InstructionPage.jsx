import React, { useState, useEffect } from 'react';
import PageIndicators from './PageIndicators';
import ExitButton from './ExitButton';
import InstructionCard from './InstructionCard';
import styles from './InstructionPage.module.css';


const steps = [
  { id: 0, animation: 'https://www.dl.dropboxusercontent.com/scl/fi/tohzccmykj47c93zxu017/finalkoptelefoon.mp4?rlkey=nixu9olop3m368m6naqa5j3x7&st=qf15xvvi' },
  { id: 1, animation: 'https://www.dl.dropboxusercontent.com/scl/fi/k14rec00487zm6pby1xlh/finalPolarAandoen_2.mp4?rlkey=dsogyc059bsonjymqha8oq74p&st=6b92wvx3' },
  { id: 2, animation: 'https://dl.dropboxusercontent.com/scl/fi/nkvyjm94umhnsk96f8yty/breath.mp4?rlkey=3m0x4qfpe6phyhuo8cc9jmgq3&st=j9vf2v7g&dl=1' },
  { id: 3, animation: 'https://www.dl.dropboxusercontent.com/scl/fi/wurtuifpxkw2qh69vnmah/finalkoptelefoon.mp4?rlkey=4e469vjzgpxnavtgo9tu7hcsq&st=utuqt22r' },
  { id: 4, animation: 'https://www.dl.dropboxusercontent.com/scl/fi/giqoo940fy2pe2q0oc3ec/stress-klein.mp4?rlkey=55lpnwnpwx25u3v1apwkv3do3&st=qby66o0y' },
  { id: 5, animation: 'https://www.dl.dropboxusercontent.com/scl/fi/wurtuifpxkw2qh69vnmah/finalkoptelefoon.mp4?rlkey=4e469vjzgpxnavtgo9tu7hcsq&st=utuqt22r' },
];

const InstructionPage = ({ setCurrentPage }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const [fade, setFade] = useState(false);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  // Wanneer je op step 2 komt (na klikken op step 1), wacht dan 4s en ga naar NullPage
    useEffect(() => {
  if (currentStep === 2) {
    const visibleTimeout = setTimeout(() => {
      setFade(true); // start fade after 5s
      const fadeTimeout = setTimeout(() => {
        setCurrentPage(2); // go to NullPage after fade
      }, 1000); // fade duration = 1s
      return () => clearTimeout(fadeTimeout);
    }, 5000); // card stays fully visible for 5s

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
