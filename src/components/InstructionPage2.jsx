import React, { useEffect, useState } from 'react';
import InstructionCard from './InstructionCard';
import ExitButton from './ExitButton';
import styles from './InstructionPage.module.css';

const centerStep = {
  id: 0,
  animation: 'https://www.dl.dropboxusercontent.com/scl/fi/1t15ccdm47z74oykuxzsv/stress-klein_1.mp4?rlkey=q1drwb5vranlpcvpgozrt9eao&st=idm3behu',
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
