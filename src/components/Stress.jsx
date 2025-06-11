import React, { useEffect } from 'react';
import ExitButton from './ExitButton';
import styles from './LayoutGrid.module.css';
import Animation from './Animation';

const Stress = ({ setCurrentPage }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage((prev) => prev + 1);
    }, 4000); // 40 seconden!!!!

    return () => clearTimeout(timer);
  }, [setCurrentPage]);
    return (
     <div className={styles.gridContainer}>
      <div className={styles.header}>
        <ExitButton onClick={() => setCurrentPage(0)} />
      </div>
     <div className={styles.fullscreenBackground}>
        <Animation src="https://www.dropbox.com/scl/fi/aildmg6y2qienlzg1piy2/stresscreenv1_.mp4?rlkey=j2yizwox6pbfi4rd92h280sdo&st=g8g96e8y&dl=1
" />
      </div>
      <div className={styles.header}>
        <div className={styles.animationBlockTimeline}>
          <Animation src="https://dl.dropboxusercontent.com/scl/fi/mfquf11hkeysv315itg5e/tijdsbalk_2.mp4?rlkey=0ctyhjeoubptaup0t4zn6ym4f&st=c8nefx22
" />
      </div>
      </div>

    </div>
    )
}

export default Stress;