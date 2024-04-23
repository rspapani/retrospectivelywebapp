import React from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
      <div className="gif-background"></div> {/* Added GIF background container */}
      <header className="header">
        <div className="brand">
          <a href="/" className="menu-link">
            Retrospectively
          </a>
        </div>
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
          <h2>Join the Waitlist</h2>
          <form>
            <div className="form-row">
              <label htmlFor="name" className="form-label">Name: </label>
              <input type="text" id="name" name="name" placeholder="Your name" required />
            </div>

            <div className="form-row">
              <label htmlFor="email" className="form-label">Email: </label>
              <input type="email" id="email" name="email" placeholder="Your email" required />
            </div>

            <label htmlFor="comment">How do you want to improve your conversation? </label>
            <textarea id="comment" name="comment" placeholder="Your Answer (optional)" rows="3"></textarea>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
