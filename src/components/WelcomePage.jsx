import React, { useState } from 'react';
import ExitButton from './ExitButton';
import PageIndicators from './PageIndicators';
import Animation from './Animation';
import styles from './LayoutGrid.module.css';
import RMSSDDisplay from './RMSSDDisplay';


function WelcomePage({currentPage, setCurrentPage }) {

  return (
    <div className={styles.gridContainer}>
    <Animation src="https://dl.dropboxusercontent.com/scl/fi/gw1yfxe8y3ghk9ujxudz7/welcomescreen_.mp4?rlkey=v3jt2h4bqp9d9ylg4ize0grrz&st=9z55mul5" />
      <div className={styles.header}>
      <PageIndicators totalPages={7} currentPage={0} />
      <ExitButton onClick={() => setCurrentPage(0)} />
      </div>

      <div className={styles.mainContent}>
        <h1>Under pressure</h1>
        <p className={styles.overlayText}>
          Tijdens deze prikkelende ervaring kom je meer te weten over hoe je lichaam reageert op externe prikkels.
        </p>
        <button className={styles.nextButton} onClick={() => setCurrentPage(currentPage + 1)}>VOLGENDE</button>

  
      </div>

      <div className={styles.footer}></div>
    </div>
  );
}

export default WelcomePage;
