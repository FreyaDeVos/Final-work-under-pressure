import React from 'react';
import styles from './Start.module.css';

const Start = ({ onClick }) => {
    
    return (
      <div className={styles.startContainer}>
             <p>koptelefoon en meetarmband aan? druk op start </p>
        <button>Start </button>
      </div>
    );
  };
  
  export default Start;