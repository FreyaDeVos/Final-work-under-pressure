import React, { useState } from 'react';
import WelcomePage from './components/WelcomePage'; 
import NextArrow from './components/NextArrow'; 
import InstructionPage from './components/InstructionPage';
import NullPage from './components/NullPage';

const App = () => {
  // We houden bij welke pagina we moeten tonen
  const [currentPage, setCurrentPage] = useState(1);

  // Functie om naar de volgende pagina te gaan
  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      {currentPage === 1 && (
        <div>
          <WelcomePage />
          <NextArrow onClick={goToNextPage} />
        </div>
      )}
      {currentPage === 2 && (
        <div>
          <InstructionPage />
          <NextArrow onClick={goToNextPage} />
        </div>
      )}
      {currentPage === 3 && (
        <div>
          <NullPage />
          <NextArrow onClick={goToNextPage} />
        </div>
      )}
    </div>
  );
};

export default App;

