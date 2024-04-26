import React from 'react';
import MediaCapture from './MediaCapture'; // Assuming this is the import path for the MediaCapture component
import Logs from './PostGame'; // Assuming this is the import path for the Logs component
import './Demo.css'; // Assuming you will write your CSS in App.css

function App() {
  return (
    <div className="app">
        <div className="media-capture-section">
            <div className='mediacol'>
                <div className="titlesec">
                    Web Demo Alpha 0.0.1
                </div>
                <MediaCapture />
                <div className="how-to-use">
                    <h2>How to Use</h2>

            </div>
          </div>
        </div>
        <div className="logs">
          <section className="live-feedback-section">
            <h2>Live Feedback:</h2>
            <p>Example Text</p>
          </section>
          <div className="logs-section">
            <Logs />
          </div>
        </div>
    </div>
  );
}

export default App;
