import React, { useEffect, useRef, useState } from 'react';
import { db } from './firebaseConfig'; // Assuming firebaseConfig.js is in the same directory
import { collection, addDoc } from 'firebase/firestore';
import {Link} from 'react-router-dom'


import './AppStatic.css';


function App() {
  const [opacity, setOpacity] = useState(0);
  const [opacitytwo, setOpacitytwo] = useState(0);
  const contentRef = useRef(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  
  
  const [submitted, setSubmitted] = useState(false);
  const [buttonText, setButtonText] = useState(' Submit ');

  const handleSubmit = async (event) => {
    console.log(event)

    event.preventDefault(); // Prevent the default form submit action

    try {
      const docRef = await addDoc(collection(db, "Waitlist"), {
        name: name,
        email: email,
        comment: comment,
        createdAt: new Date()
      });
      console.log("Document written with ID: ", docRef.id);

      setSubmitted(true); // Update the submitted state to true
      setButtonText("Thanks you'll hear from us soon!"); 

    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Error submitting the form, perhaps try disabling an ad blocker?");
    }

  };

  const handleScroll = () => {
    if (contentRef.current) {
      const { top, bottom, height } = contentRef.current.getBoundingClientRect();
      const screenHeight = window.innerHeight || document.documentElement.clientHeight;

      console.log(bottom)
      // Calculate opacity based on the scroll position
      if (top < screenHeight) {
        // Ensure that opacity goes from 0 to 1 based on the position of the content
        let newOpacity = 1 - ((top) / (height));

        newOpacity = Math.min(Math.max(newOpacity, 0), 1); // Clamp the value between 0 and 1
        if (newOpacity > 0.1){
          setOpacity(newOpacity);
          if (newOpacity >= 1){
            setOpacitytwo(1)
          }
          else {
            setOpacitytwo(0)
          }
        }
        else{
          setOpacity(0);
        }


      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  

  return (
    <div className="home-page">
    <div className="gif-background"></div>
    <div className='darkbg'
      style={{ background: 'rgb(30, 30, 30,'+ opacity + ')' }}
    >
    <div className="container">
    <header className="header"
      style={{ background: 'rgb(30, 30, 30,'+ Math.min(3*opacity, 1) + ')' }}
      >
        <div className="brand">
        <a href="./" className="menu-link">
            Retrospectively
            {/* <span className="xyz" style={{opacity: Math.min(3*opacity, 1)}}>.xyz</span> */}
        </a>
        </div>
        <div className="menu">
            <a href="./about" className="menu-link">About</a> 
        </div>
    </header>
    <div className="main-content">
        <div className="cta-container">
        <h1 className="cta-heading">Changing the way that we Communicate</h1>
        {/* <a href="./demo" className="cta-link">Try now for Free</a> */}
        <Link to="./demo" className="cta-link">Try now for Free</Link>
        </div>
        <div className="signup-form">
        <h2>Join the Waitlist</h2>
        <form name="waitlist" onSubmit={handleSubmit} data-netlify="true">
            <input type="hidden" name="form-name" value="waitlist" />
            <div className="form-row">
            <label htmlFor="name" className="form-label">Name: </label>
            <input type="text" id="name" name="name" 
            onChange={e => setName(e.target.value)}
            placeholder="Your name" required />
            </div>

            <div className="form-row">
            <label htmlFor="email" className="form-label">Email: </label>
            <input type="email" id="email" name="email"
            onChange={e => setEmail(e.target.value)}
            placeholder="Your email" required />
            </div>

            <label htmlFor="comment">How do you want to improve your conversations? </label>
            <textarea id="comment" name="comment"
            onChange={e => setComment(e.target.value)}
            placeholder="Your Answer (optional)" rows="3"></textarea>

            <button type="submit" name="submitbutt" 
              className={`submit-button ${submitted ? 'submitted' : ''}`}
              disabled={submitted}>
              {buttonText}
            </button>
        </form>
        
        </div>

        
    </div>
  
    </div>
    <div
        className="scrollable-content-section"
        ref={contentRef}
      >
      <div className="text-content">
        <p className='scrollheading'>Using AI to bring about <span className="fuckyoureact">Conversational</span> Excellence</p>
        <p className='scrollbody'>
          Retrospectively uses computer vision, tonal audio analysis, and LLM agents to become your own personal <span className="fuckyoureact">Conversation Coach</span>.  By observing your conversations, Retrospectively gives you live feedback non-intrusively so you can keep your natural flow while avoiding the social faux passes that often keep you up at night (<span className="fuckyoureact">we've all had them</span>).  By analyzing the emotional responses of the people you're talking to, and the things that have been said, we guarantee we can make you a better speaker with our end of day summaries.
        </p>

        <p className='scrollbody'>
          We plan on releasing a version for AR devices so you can take your speech coach on the go, as well as a desktop client for those excessively long Zoom calls.  But for the time being we have a <a href='./demo/'> web version</a> that you can try now.  Whether you struggle to pick up on social cues, want to make yourself a better communicator in the virtual world, or just want to improve your speech <span className="fuckyoureact">Retrospectively is for you</span>.
        </p>
      </div>

      <div className="image-content">
        {/* Place your image here */}
        <img style={{opacity: opacity}}
        src={
          require("./images/VisionProCropped.jpg")
        }
         alt="NonDescriptive Graphic" />
      </div>
    </div>
    </div>

 

    <header className="footer"
      style={{ background: 'rgb(30, 30, 30,'+ opacitytwo + ')' }}
      ></header>
    </div>

  );
}

export default App;
