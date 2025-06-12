import React from 'react';
import styles from './LayoutGrid.module.css'; // vergeet dit niet!

const StressLegend = () => {
  return (
    <div className={styles.legendWrapper}>
      <div className={styles.legendRow}>
        <div className={styles.legendItem}>
          <div className={styles.legendColor} style={{ backgroundColor: '#ffa0d3' }}></div>
          <span>Rustig (score 0–33)</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendColor} style={{ backgroundColor: '#eb7d31' }}></div>
          <span>Gemiddeld (score 34–66)</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendColor} style={{ backgroundColor: '#ff3522' }}></div>
          <span>Gestresseerd (score 67–100)</span>
        </div>
      </div>
    </div>
  );
};

export default StressLegend;
