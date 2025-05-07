import React, { useState } from 'react';
import WelcomePage from './components/WelcomePage'; 
import NextArrow from './components/NextArrow'; 
import InstructionPage from './components/InstructionPage';
import NullPage from './components/NullPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      {currentPage === 1 && (
        <div>
          <WelcomePage />
        </div>
      )}
      {currentPage === 2 && (
        <div>
          <InstructionPage />
        </div>
      )}
      {currentPage === 3 && (
        <div>
          <NullPage />
        </div>
      )}

      <div style={{
        position: 'absolute',
        top: '50%',
        right: '5%',
        transform: 'translateY(-50%)',
        cursor: 'pointer'
      }}>
        <NextArrow onClick={goToNextPage} />
      </div>
    </div>
  );
};

export default App;
