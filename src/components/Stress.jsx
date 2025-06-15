import React, { useEffect, useState } from 'react';
import ExitButton from './ExitButton';
import styles from './LayoutGrid.module.css';
import Animation from './Animation';

const Stress = ({ setCurrentPage, hrvData, onMaxRMSSDReady }) => {
  const [rmssdBuffer, setRmssdBuffer] = useState([]);
  const [startTime] = useState(Date.now()); // 

  useEffect(() => {
    if (hrvData && hrvData.rmssd > 0) {
      setRmssdBuffer((prev) => [...prev, hrvData.rmssd]);
    }
  }, [hrvData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (rmssdBuffer.length > 0) {
        const max = Math.max(...rmssdBuffer);
        console.log('📊 Stress maxRMSSD:', max);
        onMaxRMSSDReady?.(max);
      } else {
        console.warn('⚠️ Geen HRV tijdens stressmeting');
        onMaxRMSSDReady?.(null);
      }
      setCurrentPage(6);
    }, 4000);

    return () => clearTimeout(timer);
  }, []); // enkel bij eerste render uitvoeren

  return (
    <div className={styles.gridContainer}>
      <div className={styles.header}>
        <ExitButton onClick={() => setCurrentPage(0)} />
      </div>
      <div className={styles.fullscreenBackground}>
        <Animation src="https://www.dropbox.com/scl/fi/aildmg6y2qienlzg1piy2/stresscreenv1_.mp4?rlkey=j2yizwox6pbfi4rd92h280sdo&st=g8g96e8y&dl=1" />
      </div>
      <div className={styles.header}>
        <div className={styles.animationBlockTimeline}>
          <Animation src="https://dl.dropboxusercontent.com/scl/fi/mfquf11hkeysv315itg5e/tijdsbalk_2.mp4?rlkey=0ctyhjeoubptaup0t4zn6ym4f&st=c8nefx22" />
        </div>
      </div>
    </div>
  );
};

export default Stress;
