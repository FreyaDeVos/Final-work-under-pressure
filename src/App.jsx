import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import WelcomePage from './components/WelcomePage'; 
import InstructionPage from './components/InstructionPage';
import NullPage from './components/NullPage';
import Statistics1 from './components/Statistics1';
import Stress from './components/Stress';
import Statistics2 from './components/Statistics2';
import Ending from './components/Ending';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [hrvData, setHrvData] = useState(null);

  useEffect(() => {
    const socket = io('http://localhost:3001');

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
      {/* Statistics1 - Hoogste HRV tijdens rustgevende video */}
      {currentPage === 4 && <Statistics1 hrvData={hrvData} onNextPage={goToNextPage} />}
      {/* Stress pagina */}
      {currentPage === 5 && <Stress hrvData={hrvData} />}
      {/* Statistics2 - Laagste HRV na stress test */}
      {currentPage === 6 && <Statistics2 hrvData={hrvData} onNextPage={goToNextPage} />}
      {/* Bestaande Ending pagina */}
      {currentPage === 7 && <Ending />}
      
      {/* NextArrow precies zoals jij het had */}
      {currentPage !== 4 && currentPage !== 6 && currentPage < 7 && <NextArrow onClick={goToNextPage} />}
    </div>
  );
}

export default App;