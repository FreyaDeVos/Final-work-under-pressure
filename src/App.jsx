import React, { useState } from 'react';
import WelcomePage from './components/WelcomePage'; 
import NextArrow from './components/NextArrow'; 
import InstructionPage from './components/InstructionPage';
import NullPage from './components/NullPage';
import styles from './components/NextArrow.module.css';


function App() {
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
      <div>
        <NextArrow onClick={goToNextPage} />
        </div>
    </div>
  );
}

export default App;
