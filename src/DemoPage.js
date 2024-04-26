import {useState, React} from 'react';

import MediaCapture from './MediaCapture'; // Assuming this is the import path for the MediaCapture component
import LogsList from './PostGame'; // Assuming this is the import path for the Logs component
import './Demo.css'; // Assuming you will write your CSS in App.css

function App() {

  const [feedback, setFeedback] = useState("Recording not yet Started");
  const [logs, setLogs] = useState([
    {name: "Example Log",
      conversation: [
        ['Speaker 1', 'Hey how’re you?'],
        ['Speaker 2', 'I\'m not doing so well actually, my wife just died of cancer'],
        ['Speaker 1', 'Lucky you, no more nagging wife at home, you get to live free from the ball and chain'],
        ['Retrospectively', 'This comment was rude and belittled the sadness they felt from having lost a loved one.'],
        ['Speaker 2', 'Excuse me what did you just say?'],
        ['Speaker 1', 'Y\'know you get to play the field, you\'re a free man now'],
        ['Retrospectively', 'They had already expressed their offense at what you had said, do not make jokes about the loss of a loved one'],
        ['Speaker 2', 'I\'m done talking to you you jerk'],
        ['Speaker 1', 'Damn what\'s got you riled up?'],
        ['Retrospectively', 'In conclusion, you need to be more sympathetic to those experiencing loss, next time apologize for the insensitive jokes here and avoid humor on these topics.'],
      ],
    },
    {name: "Log 1",
      conversation: [
        ['Speaker 1', 'Man Screw You!'],
        ['Retrospectively', 'Don\'t say this'],
        ['Speaker 2', 'What this makes me sad =('],
      ],
    },
    {name: "Log 2",
      conversation: [
        ['Speaker 1', 'Man Screw You!'],
        ['Retrospectively', 'Don\'t say this'],
        ['Speaker 2', 'What this makes me sad =('],
      ],
    }
  ]);

  const addlog = (log) => {
    setLogs(logs.concat([log]));
    
  }

  return (
    <div className="app">
        <div className="media-capture-section">
            <div className='mediacol'>
                <div className="titlesec">
                    Web Demo Alpha 0.0.1
                </div>
                <MediaCapture setFeedback={setFeedback} addlog={addlog}/>
                <div className="how-to-use">
                    <h2>How to Use</h2>

                    <p>This is the unpublished WebDemo dashboard, it's 'mostly' functional but the server (with the ML models) has not been deployed yet.  Come back later to try us out!  But if you're a developer (which you should be) give me your feedback on the look and feel of the page!</p>

                    <p>Ideally, point the camera at whoever you're talking to and start the model (click start)!  Our model will analyze their facial expressions as well as what's being said (and the tone) to give you live feedback on your conversation.</p>

                    <p>However, most of you are probably using this on a computer with a fixed webcam which this isn't meant for - we'd like to have the final version embedded in a pair of glasses that have a camera.  This web version is mostly to to just show the functionality of the model, which you can test by calling a friend over, pointing your webcam at them, and talking to them.  We apologize for the fact that this demo isn't the most easily used tool (as of now) but we still think it'd blow your mind if you gave it a try!</p>

                    <h3>Troubleshooting</h3>

                    <p>Enable camera and microphone permissions for this site and reload.  If that doesn't work email me at <a href='mailto:dev@retrospectively.com'>dev@retrospectively.com</a> with a description of your setup (browser, computer, etc) and an output of your console log.</p>
            </div>
          </div>
        </div>
        <div className="logs">
          <div className="live-feedback-section">
            <h2>Live Feedback:</h2>
            <div class="feedback">{feedback}</div>
          </div>
          <div className="logs-section">
            {/* <h2>Past Conversations:</h2> */}
            <LogsList logsData={logs} />
          </div>
        </div>
    </div>
  );
}

export default App;
