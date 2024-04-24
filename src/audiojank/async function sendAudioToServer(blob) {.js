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