import React, { useState } from 'react';
import axios from 'axios'

const AudioRecorderPage = () => {
  const [recording, setRecording] = useState(false);

  async function sendToServer(blob) {          
    let data = new FormData();

    data.append('file', blob, 'audio.webm');
    data.append("model", "whisper-1");
    data.append("language", "en");

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.openai.com/v1/audio/transcriptions",
      headers: {
        Authorization:
          `Bearer sk-proj-KGO78iK8qd0h37lsxKIqT3BlbkFJDucN35iMllIcVPypjdR2`,
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };
    
    try {
        const transcription = await axios.request(config);
        console.log(transcription.data);
    } catch (error) {
        console.error('Error sending audio to server:', error);
    }
  }

  async function record_and_send() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    const chunks = [];

    console.log(recording)
    
    if (recording) { 
      recorder.ondataavailable = e => chunks.push(e.data);
      recorder.onstop = e => sendToServer(new Blob(chunks));
      setTimeout(()=> recorder.stop(), 5000); // we'll have a 5s media file
      recorder.start();
    }
  }

  setInterval(record_and_send, 5000);

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
