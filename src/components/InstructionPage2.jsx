import React, { useEffect, useState } from 'react';
import InstructionCard from './InstructionCard';
import ExitButton from './ExitButton';
import styles from './InstructionPage.module.css';
import PageIndicators from './PageIndicators';

const step = {
  id: 0,
  animation: 'https://www.dl.dropboxusercontent.com/scl/fi/tohzccmykj47c93zxu017/finalkoptelefoon.mp4?rlkey=nixu9olop3m368m6naqa5j3x7&st=qf15xvvi',
};

const InstructionPage2 = ({ setCurrentPage }) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const visibleTimeout = setTimeout(() => {
      setFade(true);
      const fadeTimeout = setTimeout(() => {
        setCurrentPage(5);
      }, 1000);
      return () => clearTimeout(fadeTimeout);
    }, 5000);

    return () => clearTimeout(visibleTimeout);
  }, [setCurrentPage]);

  return (
    <div className={styles.gridContainer}>
      <div className={styles.header}>
        <PageIndicators totalPages={8} currentPage={4} />
        <ExitButton onClick={() => setCurrentPage(0)} />
      </div>
      <div className={`${styles.mainContent} ${fade ? styles.fadeOut : ''}`}>
        <div className={styles.cardContainer}>
          <InstructionCard key={step.id} step={step} position="center" />
        </div>
      </div>
    </div>
  );
};

export default InstructionPage2;
