import React, { useEffect } from 'react';
import ExitButton from './ExitButton';  
import styles from './LayoutGrid.module.css';
import Animation from './Animation';

const NullPage = ({ setCurrentPage, rmssdBuffer }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage((prev) => prev + 1);
    }, 4000); 

    return () => clearTimeout(timer);
  }, [setCurrentPage]);

  return (
    <div className={styles.gridContainer}>
      <div className={styles.header}>
        <ExitButton onClick={() => setCurrentPage(0)} />
      </div>

      <div className={styles.fullscreenBackground}>
        <Animation src="https://dl.dropboxusercontent.com/scl/fi/y8zcw8t2e5z8gc8czove5/breathV3.mp4?rlkey=9rvtel8fpis1xjrk2xl3uz0um&st=48gxw67r" />
      </div>

      <div className={styles.header}>
        <div className={styles.animationBlockTimeline}>
          <Animation src="https://dl.dropboxusercontent.com/scl/fi/mfquf11hkeysv315itg5e/tijdsbalk_2.mp4?rlkey=0ctyhjeoubptaup0t4zn6ym4f&st=c8nefx22" />
        </div>
      </div>

      <div className={styles.mainContent}></div>
      <div className={styles.footer}></div>
    </div>
  );
};

export default NullPage;
