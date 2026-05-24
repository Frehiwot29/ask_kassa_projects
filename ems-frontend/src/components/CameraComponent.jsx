import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';

const CameraComponent = ({ onCapture, onCancel }) => {
    const webcamRef = useRef(null);
    const [zoom, setZoom] = useState(1);
    const [camError, setCamError] = useState(null);

    const handleUserMediaError = useCallback((error) => {
        console.error("Camera Access Error:", error);
        setCamError("Camera access denied or not found. Please check browser permissions.");
    }, []);

    const capture = useCallback(() => {
        if (!webcamRef.current) {
            console.error("Webcam reference not found");
            return;
        }

        const video = webcamRef.current.video;
        // Ensure video is ready before capturing
        if (video.readyState !== 4 || video.videoWidth === 0) {
            console.warn("Video stream not ready for capture");
            return;
        }

        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');

        // Calculate the crop area based on digital zoom
        const sw = video.videoWidth / zoom;
        const sh = video.videoHeight / zoom;
        const sx = (video.videoWidth - sw) / 2;
        const sy = (video.videoHeight - sh) / 2;

        // Draw the clipped (zoomed) area onto the full canvas size
        ctx.drawImage(video, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
        
        const imageSrc = canvas.toDataURL('image/jpeg');
        console.log("Captured Image successfully at zoom level:", zoom);
        onCapture(imageSrc);
    }, [webcamRef, onCapture, zoom]);

    const handleUserMedia = useCallback((stream) => {
        console.log("Camera stream acquired successfully:", stream);
    }, []);

    const zoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3)); // Max zoom 3x
    const zoomOut = () => setZoom(prev => Math.max(prev - 0.2, 1)); // Min zoom 1x

    return (
        <div className='text-center'>
            {camError ? (
                <div className='alert alert-danger'>{camError}</div>
            ) : (
                <div className='border rounded p-2 bg-black mb-3' style={{ position: 'relative', overflow: 'hidden', height: '350px' }}>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        onUserMediaError={handleUserMediaError}
                        onUserMedia={handleUserMedia}
                        mirrored={true}
                        screenshotFormat="image/jpeg"
                        width="100%"
                        height="100%"
                        videoConstraints={{ facingMode: "user" }}
                        style={{
                            objectFit: 'cover',
                            transform: `scale(${zoom})`,
                            transition: 'transform 0.2s ease-in-out',
                            transformOrigin: 'center'
                        }}
                    />
                    
                    {/* Zoom Controls Overlay */}
                    <div style={{
                        position: 'absolute',
                        bottom: '20px',
                        right: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        zIndex: 10
                    }}>
                        <button 
                            className="btn btn-light shadow-sm" 
                            onClick={zoomIn}
                            style={{ borderRadius: '50%', width: '45px', height: '45px', fontSize: '24px', fontWeight: 'bold', border: '2px solid #ccc' }}
                        >
                            +
                        </button>
                        <button 
                            className="btn btn-light shadow-sm" 
                            onClick={zoomOut}
                            style={{ borderRadius: '50%', width: '45px', height: '45px', fontSize: '24px', fontWeight: 'bold', border: '2px solid #ccc' }}
                        >
                            −
                        </button>
                    </div>
                </div>
            )}
            <div className='d-flex justify-content-center gap-2'>
                <button className='btn btn-success' onClick={capture} disabled={!!camError}>
                    Capture Photo
                </button>
                <button className='btn btn-secondary' onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default CameraComponent;