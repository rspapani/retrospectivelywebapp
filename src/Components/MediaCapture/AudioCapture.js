import React, { useEffect, useRef } from 'react';

const apiUrl = process.env.REACT_APP_API_URL;

const AudioCapture = ({isrecording, setFeedback, addlog, custom}) => {
  const intervalRef = useRef(null);
  const audioRef = useRef(new Audio());

  async function sendToServer(blob) {
    console.log(custom)
    const formData = new FormData();
    formData.append('file', blob, 'audio.webm');
    formData.append('prompt', custom);

    await fetch(`${apiUrl}/upload_audio`, {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json()) // Assuming the server responds with JSON containing the audio URL
    .then(data => {
      console.log("Audio Sent!")
        if (data.feedback) {
          console.log(data);
          if (data.feedback === "None") {
            console.log("no feedback")
          }
          
          else {
            setFeedback(data.feedback);
            addlog({name: "New Log: " + Date.now(), conversation: data.script});
            console.log("".concat(`${apiUrl}/audio_feedback/`, data.feedback_path));
            playAudio("".concat(`${apiUrl}/audio_feedback/`, data.feedback_path));
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
    console.log(`Starting Recording at: ${Date.now()}`)
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
    }, 25000);
  }

  useEffect(() => {
    if (isrecording) {
      record_and_send();      
      intervalRef.current = setInterval(record_and_send, 24000);
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