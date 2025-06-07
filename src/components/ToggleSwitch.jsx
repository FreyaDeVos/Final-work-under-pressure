import React from 'react';
import styles from './ToggleSwitch.module.css';

const ToggleSwitch = ({ isOn, handleToggle }) => {
  return (
    <div className={styles.toggleContainer}>
      <span className={styles.labelText}>Sta het verzamelen van anonieme data toe.</span>
      <div className={styles.switch}>
        <input
          checked={isOn}
          onChange={handleToggle}
          className={styles.checkbox}
          type="checkbox"
          id="react-switch"
        />
        <label className={styles.label} htmlFor="react-switch"> 
       {/* dit is de switch  */}
          <span className={styles.button} />
        </label>
      </div>
    </div>
  );
};

export default ToggleSwitch;
