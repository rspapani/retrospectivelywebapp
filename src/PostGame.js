import React, { useState } from 'react';
import './Logs.css'

// Single Log Entry Component
const LogEntry = ({name, conversation}) => {
  // State to handle the visibility of the conversation log
  const [isExpanded, setIsExpanded] = useState(false);
  const [show, setShow] = useState(true);

  // Function to toggle the log entry expansion
  const toggleExpansion = () => setIsExpanded(!isExpanded);

  return (
    <span>
    {show && (
    <div className="log">
        <div className="logtitle" onClick={toggleExpansion} >
        <p>{name}</p>
        <div className='buttonContainer'>
        <button className='delbutton' onClick={() => setShow(false)}>
            Delete
        </button>
        </div>
        </div>
        {isExpanded && (
        <div className="transcript">
            {conversation.map(([speaker, text]) => (
            <div className={speaker.replace(/\s/g, '')} >
               <p> <strong>{speaker}:</strong> {text} </p>
            </div>)
            )}
        </div>
      )}
    </div>
    )}</span>
  );
};


// Logs List Component
const LogsList = ({ logsData }) => {
  return (
    <div className="loglist">
      {logsData.map((log) => (
        <LogEntry name={log.name} conversation={log.conversation} />
      ))}
    </div>
  );
};


const logsData = [
    {name: "Example log",
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
    {name: "Example log",
      conversation: [
        ['Speaker 1', 'Man Screw You!'],
        ['Retrospectively', 'Don\'t say this'],
        ['Speaker 2', 'What this makes me sad =('],
      ],
    },
    {name: "Example log",
      conversation: [
        ['Speaker 1', 'Man Screw You!'],
        ['Retrospectively', 'Don\'t say this'],
        ['Speaker 2', 'What this makes me sad =('],
      ],
    },
    {name: "Example log",
      conversation: [
        ['Speaker 1', 'Hey How’re you?'],
        ['Speaker 2', 'Good How about you?'],
      ],
    },
    {name: "Example log",
      conversation: [
        ['Speaker 1', 'Man Screw You!'],
        ['Retrospectively', 'Don\'t say this'],
        ['Speaker 2', 'What this makes me sad =('],
      ],
    },
    {name: "Example log",
      conversation: [
        ['Speaker 1', 'Hey How’re you?'],
        ['Speaker 2', 'Good How about you?'],
      ],
    },
    // ... more log entries
  ];
  
console.log(logsData)

export default LogsList;
