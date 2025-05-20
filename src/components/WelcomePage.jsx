import React, { useState } from 'react';
import ExitButton from './ExitButton';
import PageIndicators from './PageIndicators';
import ToggleSwitch from './ToggleSwitch';
import Animation from './Animation';
import styles from './LayoutGrid.module.css';
import welkom from '../assets/welkom.gif';
import RMSSDDisplay from './RMSSDDisplay'; 



function WelcomePage({ hrvData }) {
  const [currentPage, setCurrentPage] = useState(0); // start op pagina 0
  const rrIntervals = hrvData?.rrIntervals || [];
  const rr = hrvData?.rrIntervals || [];

  return (  
    <div className={styles.gridContainer}>
      <div className={styles.header}>
        <PageIndicators
          totalPages={6}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        <ExitButton onClick={() => alert('Exit!')} />
      </div>

      {/* Main content */}
      <div className={styles.mainContent}>
        <h1>Under pressure</h1>
        <Animation src={welkom} alt="Welkom animatie" />
        <ToggleSwitch />

        {/* HRV-data */}
        {hrvData ? (
          <div>
            <p>❤️ Hartslag: {hrvData.hr}</p>
            <p>🧠 RR-intervallen (ms): {rrIntervals.join(', ')}</p>
            <RMSSDDisplay rrIntervals={rrIntervals} />
          </div>
        ) : (
          <p>⌛ Wachten op HRV data...</p>
        )}
      </div>
      {/* Footer */}
      <div className={styles.footer}>
      </div>
    </div>
  );
}

export default WelcomePage;
