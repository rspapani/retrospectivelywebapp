import React, { useEffect, useRef } from 'react';
import styles from './MediaCapture.module.css';

const apiUrl = process.env.REACT_APP_API_URL;

function ImageCapture({isActive}) {
    const videoRef = useRef(null);
    const intervalRef = useRef(null);
    
    useEffect(() => {
        const getVideo = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) { // Ensure the video element is mounted
                    videoRef.current.srcObject = stream;
                }

            } catch (error) {
                console.error('Error accessing webcam', error);
            }
        };
        
        getVideo();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
                // eslint-disable-next-line
                videoRef.current.srcObject = null;
            }
        };
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


        const sendImageToServer = (base64Image) => {
            fetch(`${apiUrl}/upload_image`, {
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
            <video ref={videoRef} className={styles.webcamStyle} autoPlay >
                <p>
                    No video feed available, try changing your webcam settings, and reloading the page if the issue persists.
                </p>
            </video>
            {/* 
            <button onClick={() => setIsActive(!isActive)}>
                {isActive ? 'Stop Camera' : 'Start Camera'}
            </button> */}
        </div>
    );
}

export default ImageCapture;
