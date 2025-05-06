
import React, { useState } from 'react';
import ExitButton from './ExitButton';
import PageIndicators from './PageIndicators';
import ToggleSwitch from './ToggleSwitch';
import Animation from './Animation';
import NextArrow from './NextArrow';

function WelcomePage() {
  const [currentPage, setCurrentPage] = useState(0); // start op pagina 0

  return (
    <>
      <PageIndicators
        totalPages={6}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
       <h1>Under pressure</h1>
      <div className="exit-button">
      <ExitButton onClick={() => alert('Exit!')} />
      </div>
    <Animation/>
    <NextArrow/>
    <div className="toggleContainer">
      <ToggleSwitch/>
    </div>
    </>
  );
}

export default WelcomePage;
