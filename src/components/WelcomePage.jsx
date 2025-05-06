
import React, { useState } from 'react';
import ExitButton from './ExitButton';
import PageIndicators from './PageIndicators';
import ToggleSwitch from './ToggleSwitch';
import Animation from './Animation';



function WelcomePage() {
  const [currentPage, setCurrentPage] = useState(0); // start op pagina 0

  return (
    <>
      <PageIndicators
        totalPages={6}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <div className="exit-button">
        <ExitButton />
      </div>
    <Animation/>
    <div className="toggleContainer">
      <ToggleSwitch/>
    </div>
    </>
  );
}

export default WelcomePage;
