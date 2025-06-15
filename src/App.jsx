import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

import WelcomePage from './components/WelcomePage'; 
import InstructionPage from './components/InstructionPage';
import NullPage from './components/NullPage';
import Statistics1 from './components/Statistics1';
import Stress from './components/Stress';
import Statistics2 from './components/Statistics2';
import Ending from './components/Ending';
import InstructionPage2 from './components/InstructionPage2';

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [hrvData, setHrvData] = useState(null);

  // Buffers
  const [rmssdBuffer, setRmssdBuffer] = useState([]);         // Rust
  const [stressBuffer, setStressBuffer] = useState([]);       // Stress

  // Resultaten rust
  const [maxRMSSD, setMaxRMSSD] = useState(null);

  // Resultaten stress
  const [stressMinRMSSD, setStressMinRMSSD] = useState(null);
  const [stressAvgRMSSD, setStressAvgRMSSD] = useState(null);

  // Globale gemiddelde waarden
  const GLOBAL_AVERAGE_REST = 78;   // gemiddelde waarde rust (Stat1)
  const GLOBAL_AVERAGE_STRESS = 22; // gemiddelde waarde stress (Stat2)

  useEffect(() => {
    const socket = io('http://localhost:3001');

    socket.on('connect', () => {
      console.log('✅ Verbonden met backend via Socket.IO');
    });

    socket.on('hrvData', (data) => {
      console.log('📡 HRV Data ontvangen:', data);
      setHrvData(data);

      // Tijdens rustmeting
      if (currentPage === 2 && data.rmssd > 0) {
        setRmssdBuffer(prev => [...prev, data.rmssd]);
      }

      // Tijdens stressmeting
      if (currentPage === 5 && data.rmssd > 0) {
        setStressBuffer(prev => [...prev, data.rmssd]);
      }
    });

    socket.on('disconnect', () => {
      console.log('⚠️ Verbinding met backend verbroken');
    });

    return () => {
      socket.disconnect();
    };
  }, [currentPage]);

  // Verwerk rustresultaten bij binnenkomst op Statistics1
  useEffect(() => {
    if (currentPage === 3 && rmssdBuffer.length > 0) {
      const max = Math.max(...rmssdBuffer);
      console.log('📊 maxRMSSD van rustperiode:', max);
      setMaxRMSSD(max);
    }
  }, [currentPage, rmssdBuffer]);

  // Verwerk stressresultaten bij binnenkomst op Statistics2
  useEffect(() => {
    if (currentPage === 6 && stressBuffer.length > 0) {
      const min = Math.min(...stressBuffer);
      const avg = stressBuffer.reduce((sum, val) => sum + val, 0) / stressBuffer.length;
      console.log('😰 Min RMSSD stress:', min);
      console.log('📉 Gemiddelde RMSSD stress:', avg);
      setStressMinRMSSD(min);
      setStressAvgRMSSD(avg);
    }
  }, [currentPage, stressBuffer]);

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      {currentPage === 0 && (
        <WelcomePage hrvData={hrvData} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      )}
      {currentPage === 1 && <InstructionPage setCurrentPage={setCurrentPage} />}
      {currentPage === 2 && <NullPage setCurrentPage={setCurrentPage} hrvData={hrvData} />}
      {currentPage === 3 && (
        <Statistics1 
          maxRMSSD={maxRMSSD} 
          avgRMSSD={GLOBAL_AVERAGE_REST} 
          setCurrentPage={setCurrentPage} 
        />
      )}
      {currentPage === 4 && <InstructionPage2 setCurrentPage={setCurrentPage} />}
      {currentPage === 5 && <Stress setCurrentPage={setCurrentPage} hrvData={hrvData} />}
      {currentPage === 6 && (
        <Statistics2
          minRMSSD={stressMinRMSSD}          // Persoonlijke waarde na drukte
          maxRMSSD={maxRMSSD}                // Persoonlijke waarde in rust (van Stat1)
          avgRMSSD={GLOBAL_AVERAGE_STRESS}  // Gemiddelde waarde wereldwijd in drukte
          setCurrentPage={setCurrentPage}
        />
      )}
      {currentPage === 7 && <Ending setCurrentPage={setCurrentPage} />}
    </div>
  );
}

export default App;
