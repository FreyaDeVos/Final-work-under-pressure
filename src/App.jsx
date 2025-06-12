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
  const [rmssdBuffer, setRmssdBuffer] = useState([]);
  const [maxRMSSD, setMaxRMSSD] = useState(null);

  useEffect(() => {
    const socket = io('http://localhost:3001');

    socket.on('connect', () => {
      console.log('✅ Verbonden met backend via Socket.IO');
    });

    socket.on('hrvData', (data) => {
      console.log('📡 HRV Data ontvangen:', data);
      setHrvData(data);

      if (currentPage === 2 && data.rmssd > 0) {
        setRmssdBuffer(prev => [...prev, data.rmssd]);
      }
    });

    socket.on('disconnect', () => {
      console.log('⚠️ Verbinding met backend verbroken');
    });

    return () => {
      socket.disconnect();
    };
  }, [currentPage]);

  useEffect(() => {
    if (rmssdBuffer.length > 0) {
      const max = Math.max(...rmssdBuffer);
      setMaxRMSSD(max);
      console.log("📈 Max RMSSD bijgewerkt:", max.toFixed(2));
    }
  }, [rmssdBuffer]);

  // Reset buffer en maxRMSSD telkens je op NullPage komt
  useEffect(() => {
    if (currentPage === 2) {
      setRmssdBuffer([]);
      setMaxRMSSD(null);
    }
  }, [currentPage]);

  console.log("🟢 maxRMSSD in App:", maxRMSSD);

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      {currentPage === 0 && (
        <WelcomePage
          hrvData={hrvData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
      {currentPage === 1 && <InstructionPage setCurrentPage={setCurrentPage} />}
      {currentPage === 2 && (
        <NullPage
          setCurrentPage={setCurrentPage}
          rmssdBuffer={rmssdBuffer}
        />
      )}
      {currentPage === 3 && (
        <Statistics1
          maxRMSSD={maxRMSSD}
          setCurrentPage={setCurrentPage}
        />
      )}
      {currentPage === 4 && <InstructionPage2 setCurrentPage={setCurrentPage} />}
      {currentPage === 5 && <Stress setCurrentPage={setCurrentPage} />}
      {currentPage === 6 && <Statistics2 setCurrentPage={setCurrentPage} />}
      {currentPage === 7 && <Ending setCurrentPage={setCurrentPage} />}
    </div>
  );
}

export default App;
