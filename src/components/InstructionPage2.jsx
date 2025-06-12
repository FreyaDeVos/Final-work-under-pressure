import React, { useEffect, useState } from 'react';
import InstructionCard from './InstructionCard';
import ExitButton from './ExitButton';
import styles from './InstructionPage.module.css';
import PageIndicators from './PageIndicators';

const step = {
  id: 0,
  animation: 'https://www.dl.dropboxusercontent.com/scl/fi/your_video.mp4', // pas aan naar jouw URL
};

const InstructionPage2 = ({ setCurrentPage }) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const visibleTimeout = setTimeout(() => {
      setFade(true); // start fade
      const fadeTimeout = setTimeout(() => {
        setCurrentPage(5); // ga naar de juiste volgende pagina
      }, 1000); // fade duurt 1s
      return () => clearTimeout(fadeTimeout);
    }, 5000); // kaart zichtbaar voor 5s

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
          <InstructionCard step={step} position="center" index={0} />
        </div>
      </div>
    </div>
  );
};

export default InstructionPage2;
