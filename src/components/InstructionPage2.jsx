import React, { useEffect, useState } from 'react';
import InstructionCard from './InstructionCard';
import ExitButton from './ExitButton';
import PageIndicators from './PageIndicators';
import styles from './InstructionPage.module.css';

const centerStep = {
  id: 0,
  animation: 'https://dl.dropboxusercontent.com/scl/fi/vhdx8qgzxckoa3iaojwul/stress-klein_2.mp4?rlkey=7e31tdk1qe47mdom3u8pqfozd&st=sptu2s9n&dl=1',
};

const rightStep = {
  id: 1,
  thumbnail: 'https://dl.dropboxusercontent.com/scl/fi/ntq75orq6xnaix1z65he1/statimage.png?rlkey=1tivnsl552pom5sc2tqhcfb0p&st=051qlyoi&dl=1',
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
    }, 2200);

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
          <InstructionCard step={centerStep} position="center" />
          <InstructionCard step={rightStep} position="right" />
        </div>
      </div>
    </div>
  );
};

export default InstructionPage2;
