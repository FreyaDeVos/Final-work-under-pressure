import React from 'react';

const StressLegend = () => {
  return (
    <div style={{ marginTop: '1rem' }}>
      <h4>Legenda</h4>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 20, height: 20, backgroundColor: '#ffa0d3', marginRight: 8 }}></div>
          <span>Rustig (score 0–33)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 20, height: 20, backgroundColor: '#eb7d31', marginRight: 8 }}></div>
          <span>Gemiddeld (score 34–66)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 20, height: 20, backgroundColor: '#ff3522', marginRight: 8 }}></div>
          <span>Gestresseerd (score 67–100)</span>
        </div>
      </div>
    </div>
  );
};

export default StressLegend;
