import React from 'react';
import PageIndicators from './PageIndicators';
import ExitButton from './ExitButton';
import Animation from './Animation';
import styles from './Ending.module.css';

function Ending({ setCurrentPage }) {
  const nextStep = () => {
    setCurrentPage(0); // terug naar start
  };

  return (
    <div className={styles.gridContainer}>
      <div className={styles.header}>
        <PageIndicators totalPages={7} currentPage={6} />
        <ExitButton onClick={nextStep} />
      </div>

      <div className={styles.mainContent}>
        <div className={styles.textAndButton}>
  <p className={styles.overlayText}>
   Je hebt ervaren hoe jouw lichaam reageert op externe prikkels. <br></br>Meer weten? <br></br> 
   Ontdek hieronder boeiende weetjes en tips over hoe je lichaam met prikkels omgaat..
  </p>
  <button
    className={styles.nextButtonEnding}
    onClick={() => setCurrentPage(0)} // terug naar start
  >
    TERUG NAAR START
  </button>
</div>
        <div className={styles.fullscreenBackground}>
          <Animation src="https://dl.dropboxusercontent.com/scl/fi/px8djurjefxw2xvjo4suk/ending01.mp4?rlkey=epmvvinj2c3jp3qpfbb4f05zt&st=6ckthjpr" />
        </div>
      </div>
    </div>
  );
}

export default Ending;
