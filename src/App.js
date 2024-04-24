import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'

const AudioRecorderPage = () => {
  const [recording, setRecording] = useState(false);
  const intervalRef = useRef(null);

  async function sendToServer(blob) {
    const formData = new FormData();
    formData.append('file', blob, 'audio.webm');

    try {
        const response = await fetch('http://localhost:5000/upload_audio', {
            method: 'POST',
            body: formData,
        });
        
        const data = await response.json();
        console.log('Server response:', data);

    } catch (error) {
        console.error('Error sending audio to server:', error);
    }
  }

  async function record_and_send() {
    if (!recording) return;

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    const chunks = [];

    recorder.ondataavailable = e => chunks.push(e.data);
    recorder.onstop = () => {
        sendToServer(new Blob(chunks));
        stream.getTracks().forEach(track => track.stop()); // stop the media stream
    };

    recorder.start();
    setTimeout(() => {
        recorder.stop();
    }, 5000);
  }

  useEffect(() => {
    if (recording) {
        intervalRef.current = setInterval(record_and_send, 5000);
    } else {
        clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [recording]);

  return (
    <div> {!recording ? 
    <button onClick={() => setRecording(true)}>
      Start Recording
    </button> :
    <button onClick={() => setRecording(false)}>
      Stop Recording
    </button> }
    </div>
  );
};

export default AudioRecorderPage;
