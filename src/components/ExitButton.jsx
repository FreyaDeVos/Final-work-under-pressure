import React from 'react';
import styles from './ExitButton.module.css';

function ExitButton() {
  const handleClick = () => {
    alert('Sluiten!');
  };

  return (
    <button className={styles.exitButton} onClick={handleClick}>
      ×
    </button>
  );
}

export default ExitButton;

  