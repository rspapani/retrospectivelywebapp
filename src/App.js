import React from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
      <div className="gif-background"></div> {/* Added GIF background container */}
      <header className="header">
        <div className="brand">Retrospectively</div>
        <nav className="menu">
          <a href="/about" className="menu-link">About</a> {/* Updated to be a link */}
        </nav>
      </header>
      <div className="main-content">
        <div className="cta-container">
          <h1 className="cta-heading">Changing the way we Communicate</h1>
          <a href="/signup" className="cta-link">Try now for free</a>
        </div>
        <div className="signup-form">
          <p>*Sign up form*</p>
        </div>
      </div>
    </div>
  );
}

export default App;
