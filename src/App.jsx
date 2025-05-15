import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import WelcomePage from './components/WelcomePage'; 
import NextArrow from './components/NextArrow'; 
import InstructionPage from './components/InstructionPage';
import NullPage from './components/NullPage';
import Statistics1 from './components/Statistics1';
import Stress from './components/Stress';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [hrvData, setHrvData] = useState(null);

  useEffect(() => {
    const socket = io('http://localhost:3001'); // Pas aan indien je backend op andere url draait

    socket.on('connect', () => {
      console.log('✅ Verbonden met backend via Socket.IO');
    });

    socket.on('hrvData', (data) => {
      console.log('📡 HRV Data ontvangen:', data);
      setHrvData(data);
    });

    socket.on('disconnect', () => {
      console.log('⚠️ Verbinding met backend verbroken');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
     {currentPage === 1 && <WelcomePage hrvData={hrvData} />}
      {currentPage === 2 && <InstructionPage />}
      {currentPage === 3 && <NullPage />}
      {/* Doorgeef HRV-data als prop aan componenten die het nodig hebben */}
      {currentPage === 4 && <Statistics1 hrvData={hrvData} />}
      {currentPage === 5 && <Stress hrvData={hrvData} />}
      <NextArrow onClick={goToNextPage} />
    </div>
  );
}

export default App;
