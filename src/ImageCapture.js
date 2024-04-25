import React, { useState, useEffect, useRef } from 'react';

function WebcamCapture() {
    const [isActive, setIsActive] = useState(false);
    const videoRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isActive) {
            const getVideo = async () => {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                    videoRef.current.srcObject = stream;
                } catch (error) {
                    console.error('Error accessing webcam', error);
                }
            };
            getVideo();
        } else {
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
                videoRef.current.srcObject = null;
            }
        }
    }, [isActive]);

    useEffect(() => {
        const captureImage = () => {
            if (!videoRef.current) return;
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const context = canvas.getContext('2d');
            context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            // Convert canvas to base64
            const base64Image = canvas.toDataURL('image/jpeg');
            sendImageToServer(base64Image);
        };

        // const sendImageToServer = (base64Image) => {
        //     const formData = new FormData();
        //     formData.append('image_base64', base64Image);
        //     // Replace 'YOUR_SERVER_IMAGE_ENDPOINT' with your actual endpoint
        //     fetch('http://localhost:5000/upload_image', {
        //         method: 'POST',
        //         body: formData,
        //     }).then(() => {
        //         console.log('Image sent successfully');
        //     }).catch(error => {
        //         console.error('Error sending image', error);
        //     });
        // };

        const sendImageToServer = (base64Image) => {
            fetch('http://localhost:5000/upload_image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'  // Indicates you're sending JSON data
                },
                body: JSON.stringify({ image_base64: base64Image })  // Send the base64 image as a JSON object
            }).then(() => {
                console.log('Image sent successfully');
            }).catch(error => {
                console.error('Error sending image', error);
            });
        };

        if (isActive) {
            intervalRef.current = setInterval(captureImage, 5000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isActive]);

    return (
        <div>
            <video ref={videoRef} autoPlay style={{ display: 'none' }}></video>
            <button onClick={() => setIsActive(!isActive)}>
                {isActive ? 'Stop Camera' : 'Start Camera'}
            </button>
        </div>
    );
}

export default WebcamCapture;
