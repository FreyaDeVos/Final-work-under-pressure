import React from 'react';
import styles from './Start.module.css';

const Start = ({ onClick }) => {
    return (
      <div className={styles.startContainer}>
        <button>Start </button>
      </div>
    );
  };
  
  export default Start;