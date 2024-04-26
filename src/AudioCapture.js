import React, { useEffect, useRef } from 'react';

const AudioCapture = ({isrecording, setFeedback}) => {
  const intervalRef = useRef(null);
  const audioRef = useRef(new Audio());

  async function sendToServer(blob) {
    const formData = new FormData();
    formData.append('file', blob, 'audio.webm');

    await fetch('http://localhost:5000/upload_audio', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json()) // Assuming the server responds with JSON containing the audio URL
    .then(data => {
      console.log("Audio Sent!")
        if (data.feedback) {
          setFeedback(data.feedback);
          console.log(data);
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
    if (!isrecording) return;

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
    if (isrecording) {
      intervalRef.current = setInterval(record_and_send, 5000);
    } else {
        clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line
  }, [isrecording]);

  return (
    // <div> {!recording ? 
    // <button onClick={() => setRecording(true)}>
    //   Start Recording
    // </button> :
    // <button onClick={() => setRecording(false)}>
    //   Stop Recording
    // </button> }
    // </div>
    <span></span>
  );
};

export default AudioCapture;
