import React, { useState } from 'react';
import ExitButton from './ExitButton';
import styles from './LayoutGrid.module.css';
import Animation from './Animation';

function Stress({ setCurrentPage }) {
      const nextStep = () => {
    setCurrentPage(5); 
  };
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
          <Animation src="https://dl.dropboxusercontent.com/scl/fi/n51ri0lnnfvrpbe51eoqy/tijdsbalk.mp4?rlkey=0wjcrvj9ffzkxxyj6vuzwze0i&st=o0so9xcc
" />
      </div>
      </div>

    </div>
    )
}

export default Stress;