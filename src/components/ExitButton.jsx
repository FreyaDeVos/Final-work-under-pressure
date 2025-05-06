import React from 'react';
import styles from './ExitButton.module.css';
import { AiOutlineClose } from '../../node_modules/react-icons/ai';


const ExitButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.exitButton}>
            <AiOutlineClose size={20} />
    </button>
  );
};

export default ExitButton;
