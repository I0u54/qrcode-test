import React, { useState } from "react";
import { useRef } from "react";

export default function App(props) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [stream, setStream] = useState(null);

  const handleOpenCamera = async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = newStream;
      setStream(newStream);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const handleCapturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageUrl = canvas.toDataURL("image/jpeg");
    setImage(imageUrl);
    
    // Stop the media stream
    stream.getTracks().forEach(track => track.stop());
    setStream(null); 
    videoRef.current.style.display = "none"
  };

  return (
    <div>
      <button onClick={handleOpenCamera}>Open Camera</button>
      <button onClick={handleCapturePhoto}>Capture Photo</button>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: "100%", maxWidth: "500px" }}
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {image && <img src={image} />}
    </div>
  );
}
