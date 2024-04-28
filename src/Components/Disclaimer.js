import React from 'react';
import './Disclaimer.css';

const Disclaimer = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="Disclaimer-overlay">
        <div className="Disclaimer-content">
            {children}
            <button className="buttonStyle" onClick={onClose}>Accept, Acknowledge, and Continue</button>
        </div>
    </div>
    );
};

export default Disclaimer;
