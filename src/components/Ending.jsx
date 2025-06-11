import React, { useState } from 'react';
import PageIndicators from './PageIndicators';
import ExitButton from './ExitButton';
import Animation from './Animation';
import styles from './Ending.module.css';

const tips = {
  1: "Wist je dat ... zelfs vrolijke muziek stressvol kan zijn als het te luid is?",
  2: "Wist je dat ... door lange schermtijd verkeert je brein in een aanhoudende staat van alertheid, wat leidt tot verhoogde stress.",
  3: "Wist je dat ... externe prikkels kunnen een stressreactie uitlokken zonder dat je het bewust doorhebt.",
  4: "Wist je dat ... luid geluid je lichaam automatisch in een vecht-of-vluchtmodus kan zetten – ook al is er geen echt gevaar.",
  5: "Wist je dat ... het geluid van een huilende baby wordt wereldwijd beschouwd als een van de meest stressverhogende geluiden.",
  6: "Wist je dat ... stress door externe prikkels verlaagt je werkgeheugen, waardoor je minder informatie kunt vasthouden."
};


function Ending({ setCurrentPage }) {
  const [activeTip, setActiveTip] = useState(null);

  const nextStep = () => {
    setCurrentPage(0); // terug naar start
  };

const handleHotspotClick = (e, num) => {
  if (activeTip?.number === num) {
    setActiveTip(null); // sluit popup bij herklik op dezelfde
    return;
  }

  const rect = e.target.getBoundingClientRect();
  const scrollY = window.scrollY || window.pageYOffset;
  const scrollX = window.scrollX || window.pageXOffset;

  setActiveTip({
    number: num,
    top: rect.top + rect.height / 2 + scrollY,
    left: rect.left + rect.width / 2 + scrollX
  });
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
            <h1>Under pressure</h1>
            Je hebt ervaren hoe jouw lichaam reageert op externe prikkels. <br />
            Meer weten? <br />
            Ontdek hieronder boeiende weetjes en tips over hoe je lichaam met prikkels omgaat.
          </p>
          <button
            className={styles.nextButtonEnding}
            onClick={nextStep}
          >
            TERUG NAAR START
          </button>
        </div>

        <div className={styles.fullscreenBackground}>
          <Animation src="https://dl.dropboxusercontent.com/scl/fi/px8djurjefxw2xvjo4suk/ending01.mp4?rlkey=epmvvinj2c3jp3qpfbb4f05zt&st=6ckthjpr" />
        </div>

        <div className={styles.hotspotContainer}>
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <button
              key={num}
              className={`${styles.hotspotButton} ${styles[`hotspot${num}`]}`}
              onClick={(e) => handleHotspotClick(e, num)}
            />
          ))}

          {activeTip && (
  <div
    className={styles.tipPopup}
    style={{
      top: `${activeTip.top}px`,
      left: `${activeTip.left}px`,
      transform: 'translate(-50%, -50%)'
    }}
    onClick={() => setActiveTip(null)}>
  <div className={styles.popupBackground}>
    <p className={styles.popupText}>{tips[activeTip.number]}</p>
  </div>
  </div>)}
        </div>
      </div>
    </div>
  );
}

export default Ending;
