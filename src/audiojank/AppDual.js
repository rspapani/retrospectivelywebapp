import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'

function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const recorderOne = useRef(null);
  const recorderTwo = useRef(null);
  const [activeRecorder, setActiveRecorder] = useState(null);
  const [inactiveRecorder, setInactiveRecorder] = useState(null);


  async function record_and_send() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    const chunks = [];
    recorder.ondataavailable = e => chunks.push(e.data);
    recorder.onstop = e => sendToServer(new Blob(chunks));
    setTimeout(()=> recorder.stop(), 5000); // we'll have a 5s media file
    recorder.start();
 }  
  // This function initializes a MediaRecorder and starts recording
  const initRecorder = async (setRecorderRef) => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const newRecorder = new MediaRecorder(stream);
    setRecorderRef.current = newRecorder;
    newRecorder.start();
    return newRecorder;
  };

  setInterval(record_and_send, 5000);

  // Send audio to server
  // const sendAudioToServer = async (blob) => {
  //   const formData = new FormData();
  //   formData.append('audio', blob, `audio_${Date.now()}.webm`);

  //   try {
  //     await fetch('YOUR_SERVER_ENDPOINT', {
  //       method: 'POST',
  //       body: formData,
  //     });
  //   } catch (error) {
  //     console.error('Error sending audio to server:', error);
  //   }
  // };

  async function sendAudioToServer(blob) {
    // const formData = new FormData();
    // formData.append('file', blob, 'audio.webm');

          
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
        // const response = await fetch('http://localhost:5000/upload_audio', {
        //     method: 'POST',
        //     body: formData,
        // });
        
        // const transcription = await openai.audio.transcriptions.create({
        //   file: blob,
        //   model: "whisper-1",
        // });

        const transcription = await axios.request(config);

        // const data = await response.json();
        // console.log('Server response:', data);
        console.log(transcription.data);

    } catch (error) {
        console.error('Error sending audio to server:', error);
    }
}

  // Function to handle recording and switching recorders
  const handleRecording = async () => {
    if (!isRecording) {
      // Start the recording process
      recorderOne.current = await initRecorder(recorderOne);
      setActiveRecorder(recorderOne);
      setIsRecording(true);

      // After 30 seconds, switch recorders
      setTimeout(async () => {
        recorderTwo.current = await initRecorder(recorderTwo);
        setActiveRecorder(recorderTwo);
        setInactiveRecorder(recorderOne);

        // Prepare to switch back after another 30 seconds
        setInterval(async () => {
          const inactive = activeRecorder === recorderOne ? recorderTwo : recorderOne;
          const active = activeRecorder === recorderOne ? recorderOne : recorderTwo;

          inactive.current.stop();
          inactive.current.ondataavailable = async (e) => {
            await sendAudioToServer(e.data);
            inactive.current.stream.getTracks().forEach(track => track.stop()); // Stop the media stream
            inactive.current = await initRecorder(inactive === recorderOne ? recorderOne : recorderTwo);
          };
          
          setActiveRecorder(inactive);
          setInactiveRecorder(active);
        }, 2000);
      }, 2000);
    } else {
      // Stop the recording process
      [recorderOne, recorderTwo].forEach((recorderRef) => {
        if (recorderRef.current && recorderRef.current.state === 'recording') {
          recorderRef.current.stop();
        }
      });
      setIsRecording(false);
    }
  };

  useEffect(() => {
    // Cleanup recorders on unmount
    return () => {
      [recorderOne, recorderTwo].forEach((recorderRef) => {
        if (recorderRef.current) {
          recorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
      });
    };
  }, []);

  return (
    <div>
      <button onClick={handleRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
    </div>
  );
}

export default AudioRecorder;
