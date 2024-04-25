import React, { useState } from 'react';
import AudioCapture from './AudioCapture';
import ImageCapture from './ImageCapture';
import styles from './MediaCapture.module.css';

function MediaManager() {
    const [isActive, setIsActive] = useState(false);
    

    const handleToggle = () => {
        setIsActive(!isActive);
    };

    return (
        <div className={styles.containerStyle}>
          <div className={styles.webcamContainerStyle}>
                <ImageCapture isActive={isActive}/>

            </div>
            <div className={styles.buttonContainerStyle}>
                <button className={styles.buttonStyle}>Help</button>

                <button className={`${styles.buttonStyle} ${styles.middleButton}`} >Settings</button>

                <button className={styles.buttonStyle} onClick={handleToggle}>
                    {isActive ? 'Stop' : 'Start'}
                </button>
            </div>

            <AudioCapture isrecording={isActive} />
        </div>
    );
}

export default MediaManager;
