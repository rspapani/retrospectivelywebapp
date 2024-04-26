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
        ['Speaker 1', 'Hey How’re you?'],
        ['Speaker 2', 'Good How about you?'],
      ],
    },
    {name: "Example log",
      conversation: [
        ['Speaker 1', 'Man Fuck You!'],
        ['Speech Coach', 'Don\'t say this'],
        ['Speaker 2', 'What this makes me sad =('],
      ],
    },
    {name: "Example log",
      conversation: [
        ['Speaker 1', 'Man Fuck You!'],
        ['Speech Coach', 'Don\'t say this'],
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
        ['Speaker 1', 'Man Fuck You!'],
        ['Speech Coach', 'Don\'t say this'],
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

const Logs = () => {
  return <LogsList logsData={logsData}/>;
};

export default Logs;
