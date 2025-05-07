import React from 'react';
import PageIndicators from './PageIndicators'; 
import ExitButton from './ExitButton';  
import styles from './NullPage.module.css';
import Animation from './Animation';


const NullPage = ({ onNextPage }) => {
  return (
    <div className={styles.NullPageContainer}>
      <PageIndicators totalPages={6} currentPage={2} onPageChange={() => {}} />
      <ExitButton onClick={() => alert('Exit!')} />
      <div>
            <p>Volg met je ademhaling de afbeeling hieronder</p>
    </div>
    </div>
  
  );
};

export default NullPage;