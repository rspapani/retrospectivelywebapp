import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'

const AudioRecorderPage = () => {
  const [recording, setRecording] = useState(false);
  const intervalRef = useRef(null);
  const audioRef = useRef(new Audio());

  async function sendToServer(blob) {
    const formData = new FormData();
    formData.append('file', blob, 'audio.webm');

    const response = await fetch('http://localhost:5000/upload_audio', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json()) // Assuming the server responds with JSON containing the audio URL
    .then(data => {
        if (data.feedback_path) {
          if (data.feedback_path !== "") {
            console.log("".concat("http://localhost:5000/audio_feedback/", data.feedback_path));
            playAudio("".concat("http://localhost:5000/audio_feedback/", data.feedback_path));
          }
          
          else {
            console.log("no feedback")
          }
        }

        else {
          console.log("no feedback path?")
        }
    })
    .catch(error => {
        console.error('Error sending file', error);
    });
  }

  function playAudio(url) {
    if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.play()
        .catch(error => console.error('Error playing audio:', error));
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
    }, 20000);
  }

  useEffect(() => {
    if (recording) {
        intervalRef.current = setInterval(record_and_send, 20000);
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
