import React, { useState } from "react";
import "./DemoVideo.css";

const DemoVideo = () => {
    // State to hold the current video source
    const [videoSource, setVideoSource] = useState(require('../../assets/videos/litter_cam.mp4'));

    // Handle video upload and change the video source
    const handleVideoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const videoURL = URL.createObjectURL(file);
            setVideoSource(videoURL); // Update the video source with the uploaded file
        }
    };

    return (
        <div className="video-container">
            <h1 className="video-heading">Demo</h1>
            {/* Video element */}
            <video className="responsive-video" controls key={videoSource}>
                <source src={videoSource} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <p>Upload a video to test.</p>

            {/* Upload button */}
            <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                className="upload-button"
            />
        </div>
    );
};

export default DemoVideo;
