import React from 'react';
import './Settings.css';

const Settings = ({ isOpen, onClose, children, apply }) => {

    return (
        <div className={`settings ${isOpen ? 'open' : ''}`}>
            
            {children}

            <div className='buttonsportion'>
                <button className="SettingsButtonStyle" onClick={apply}>Apply</button>
                <button className="SettingsButtonStyle" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Settings;
