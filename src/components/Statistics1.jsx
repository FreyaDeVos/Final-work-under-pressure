import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import ExitButton from './ExitButton';
import PageIndicators from './PageIndicators';

import styles from './LayoutGrid.module.css';

const socket = io('http://localhost:3001');

function calculateRMSSD(rrIntervals) {
  if (!rrIntervals || rrIntervals.length < 2) return 0;

  const diffs = [];
  for (let i = 1; i < rrIntervals.length; i++) {
    const diff = rrIntervals[i] - rrIntervals[i - 1];
    diffs.push(diff * diff);
  }

  const meanSq = diffs.reduce((a, b) => a + b, 0) / diffs.length;
  return Math.sqrt(meanSq);
}

function StatisticsPage({ currentPage, setCurrentPage }) {
  const [hrvData, setHrvData] = useState(null);
  const [rmssdValues, setRmssdValues] = useState([]);
  const [timerEnded, setTimerEnded] = useState(false);

  useEffect(() => {
    const start = Date.now();

    const handleData = (data) => {
      setHrvData(data);

      const elapsed = (Date.now() - start) / 1000;
      if (elapsed <= 40 && data.rmssd) {
        setRmssdValues(prev => [...prev, data.rmssd]);
      }

      if (elapsed > 40 && !timerEnded) {
        setTimerEnded(true);
      }
    };

    socket.on('hrvData', handleData);

    return () => {
      socket.off('hrvData', handleData);
    };
  }, [timerEnded]);

  const hr = hrvData?.hr || '⌛';
  const rrIntervals = hrvData?.rrIntervals || [];
  const hrvScore = hrvData?.rmssd?.toFixed(2) || '⌛';
  const maxRMSSD = rmssdValues.length > 0 ? Math.max(...rmssdValues) : 0;

  return (
    <div className={styles.gridContainer}>
      <div className={styles.header}>
        <PageIndicators totalPages={7} currentPage={currentPage} />
        <ExitButton onClick={() => setCurrentPage(0)} />
      </div>

      <div className={styles.mainContent}>
        <h2>Live Statistieken</h2>
        <p>❤️ Hartslag: {hr} bpm</p>
        <p>🧠 RR-intervallen: {rrIntervals.join(', ') || 'Geen data'}</p>
        <p>💓 HRV (RMSSD): {hrvScore}</p>

        {timerEnded && (
          <div>
            <h3>Rustigste waarde in 40 seconden</h3>
            <HRVBar rmssd={maxRMSSD} />
          </div>
        )}
      </div>

      <div className={styles.footer}></div>
    </div>
  );
}

export default StatisticsPage;
