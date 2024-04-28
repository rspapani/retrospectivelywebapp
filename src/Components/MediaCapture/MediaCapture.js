import React, { useState } from 'react';
import AudioCapture from './AudioCapture';
import ImageCapture from './ImageCapture';
import styles from './MediaCapture.module.css';

function MediaManager({setFeedback, addlog, openSettings, gethelp, custom}) {
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
                <button onClick={gethelp} className={styles.buttonStyle}>Help</button>

                <button onClick={openSettings} 
                className={`${styles.buttonStyle} ${styles.middleButton}`} >Settings</button>

                <button className={styles.buttonStyle} onClick={handleToggle}>
                    {isActive ? 'Stop' : 'Start'}
                </button>
            </div>

            <AudioCapture 
            custom={custom}
            isrecording={isActive} setFeedback={setFeedback} addlog={addlog}/>
        </div>
    );
}

export default MediaManager;
