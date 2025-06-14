import React from 'react';
import styles from './LayoutGrid.module.css';

const StressLegend = () => {
  return (
    <div className={styles.legendWrapper}>
      <div className={styles.legendRow}>
        <div className={styles.legendItem}>
          <span className={styles.legendTitle}>Stresslevel (0 – 100)</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendColor} style={{ backgroundColor: '#ffa0d3' }} />
          <span>laag (0 - 33)</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendColor} style={{ backgroundColor: '#eb7d31' }} />
          <span>gemiddeld (34-66)</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendColor} style={{ backgroundColor: '#ff3522' }} />
          <span>hoog (67 - 100)</span>
        </div>
      </div>
    </div>
  );
};

export default StressLegend;
