import React from 'react';

function calculateRMSSD(rrIntervals) {
  if (!rrIntervals || rrIntervals.length < 2) return 0;

  const differences = [];
  for (let i = 1; i < rrIntervals.length; i++) {
    const diff = rrIntervals[i] - rrIntervals[i - 1];
    differences.push(diff * diff); // kwadratisch
  }

  const meanDiff = differences.reduce((a, b) => a + b, 0) / differences.length;
  return Math.round(Math.sqrt(meanDiff)); // RMSSD afronden naar hele/ ronde getallen
}

function RMSSDDisplay({ rrIntervals }) {
  const rmssd = calculateRMSSD(rrIntervals);

  return (
    <div>
      <p>📊 RMSSD (HRV): {rmssd} ms</p>
    </div>
  );
}

export default RMSSDDisplay;