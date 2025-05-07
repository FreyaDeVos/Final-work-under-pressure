import React, { useState } from 'react';
import WelcomePage from './components/WelcomePage'; 
import NextArrow from './components/NextArrow'; 
import InstructionPage from './components/InstructionPage';
import NullPage from './components/NullPage';


function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      {currentPage === 1 && <WelcomePage />}
      {currentPage === 2 && <InstructionPage />}
      {currentPage === 3 && <NullPage />}
      {/* Toon altijd de NextArrow */}
      <NextArrow onClick={goToNextPage} />
    </div>
  );
}

export default App;
