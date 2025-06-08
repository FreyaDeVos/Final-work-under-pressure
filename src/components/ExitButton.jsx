import React from 'react';
import styles from './ExitButton.module.css';
import exitIcon from '../assets/exit.png'; 


const ExitButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.exitButton}>
                <img src={exitIcon} alt="Exit" className={styles.exitIcon} />
    </button>
  );
};

export default ExitButton;
