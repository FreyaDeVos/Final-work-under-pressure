import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import WelcomePage from './components/WelcomePage'; 
import InstructionPage from './components/InstructionPage';
import NullPage from './components/NullPage';
import Statistics1 from './components/Statistics1';
import Stress from './components/Stress';

function App() {
  const [currentPage, setCurrentPage] = useState(0);
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
    {currentPage === 2 && <NullPage setCurrentPage={setCurrentPage} />}
    {currentPage === 3 && <Statistics1 hrvData={hrvData} setCurrentPage={setCurrentPage} />}
    {currentPage === 4 && <Stress setCurrentPage={setCurrentPage} />}
  </div>
);

}

export default App;
