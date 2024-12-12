import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";

const Demo = () => {
    const [uploadedVideoSource, setUploadedVideoSource] = useState(assets.input); // For the uploaded video
    const [isUploading, setIsUploading] = useState(false); // To handle loader
    const [responseVideoSource, setResponseVideoSource] = useState(assets.output); // For the predicted video
    const [responseImageSource, setResponseImageSource] = useState(assets.frame); // For the returned image
    const [responseNumber, setResponseNumber] = useState("QBD 4237"); // For the returned number
    const [videoFile, setVideoFile] = useState(null); // To hold the uploaded video file


    // Handle video upload
    const handleVideoUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('video/')) {
            // Create object URL for immediate preview
            const uploadedVideoUrl = URL.createObjectURL(file);
            setUploadedVideoSource(uploadedVideoUrl);
            setVideoFile(file);

            // Reset other states
            setResponseVideoSource(null);
            setResponseImageSource(null);
            setResponseNumber("");
        }
    };

    // Start processing the video
    const handleStartProcessing = async () => {
        if (!videoFile) {
            alert("Please upload a video first.");
            return;
        }

        setIsUploading(true); // Show loader

        const formData = new FormData();
        formData.append("video", videoFile); // Use the stored video file

        try {
            // Step 1: Upload video and get the key and license plate number
            const uploadResponse = await fetch("http://127.0.0.1:5000", {
                method: "POST",
                body: formData,
            });

            const uploadData = await uploadResponse.json();
            if (!uploadResponse.ok) {
                console.error("Error:", uploadData);
                alert("Failed to process the video. Please try again.");
                return;
            }

            const { database_record_id, license_number } = uploadData; // Extract license plate and key

            console.log("FIRST CALL RESPONSE");
            console.log(uploadData);
            console.log(license_number);
            console.log(database_record_id);

            // Step 2: Use the key to fetch the predicted video and image
            const fetchResponse = await fetch(`http://127.0.0.1:5000/retrieve/${database_record_id}`);
            const fetchData = await fetchResponse.json();
            if (!fetchResponse.ok) {
                console.error("Error:", fetchData);
                alert("Failed to retrieve results. Please try again.");
                return;
            }

            console.log("SECOND CALL RESPONSE");
            console.log(fetchResponse);
            console.log(fetchResponse.video);
            console.log(fetchResponse.image);

            // Update states with the retrieved data
            const { video, image } = fetchData;

            // Update states with the retrieved data
            setResponseNumber(license_number);

            // Set response sources
            setResponseVideoSource(fetchData.video);
            setResponseImageSource(fetchData.image);
        } catch (error) {
            console.error("Error during processing:", error);
            alert("An error occurred. Please check the console for details.");
        } finally {
            setIsUploading(false); // Hide loader
        }
    };

    return (
        <div className="text-center p-4">
            <h2 className="text-center text-3xl font-semibold text-gray-800 mb-8">Demo</h2>

            {/* Video display section */}
            <div className="flex flex-wrap justify-between mb-6">
                <div className="flex-1 min-w-[300px] max-w-[150vh] m-2">
                    <h3 className="text-left mb-2">Original Video</h3>
                    {uploadedVideoSource ? (
                        <video
                            key={uploadedVideoSource}
                            className="w-full max-w-full h-auto"
                            controls
                        >
                            <source src={uploadedVideoSource} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <div className="bg-gray-200 h-64 flex items-center justify-center">
                            No video uploaded
                        </div>
                    )}
                </div>

                <div className="flex-1 min-w-[300px] max-w-[150vh] m-2">
                    <h3 className="text-left mb-2">Predicted Video</h3>
                    {responseVideoSource ? (
                        <video
                            key={responseVideoSource}
                            className="w-full max-w-full h-auto"
                            controls
                        >
                            <source src={responseVideoSource} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <div className="bg-gray-200 h-64 flex items-center justify-center">
                            No predicted video
                        </div>
                    )}
                </div>
            </div>

            {/* Upload button or circular indicator */}
            <div className="mt-6">
                {isUploading ? (
                    <div className="border-4 border-t-4 border-gray-300 border-t-gray-800 rounded-full w-10 h-10 animate-spin mx-auto"></div> // Circular loader
                ) : (
                    <>
                        <input
                            type="file"
                            accept="video/*"
                            onChange={handleVideoUpload}
                            className="bg-gray-800 text-white px-4 py-2 rounded-md cursor-pointer mt-2 mr-2"
                        />
                        <button
                            onClick={handleStartProcessing}
                            className="bg-gray-800 text-white px-4 py-2 rounded-md cursor-pointer mt-2"
                        >
                            Start Processing
                        </button>
                    </>
                )}
            </div>

            <div className="flex justify-evenly">
                <div className="mt-6">
                    <h2 className="text-left mb-2">Proof</h2>
                    {responseImageSource ? (
                        <img
                            src={responseImageSource}
                            alt="Returned Image"
                            className="w-full max-w-[400px] mx-auto mb-6"
                        />
                    ) : (
                        <div className="bg-gray-200 h-64 w-64 flex items-center justify-center">
                            No image available
                        </div>
                    )}
                </div>

                <div className="mt-6">
                    <h2 className="text-left mb-2">Returned Number</h2>
                    <div className="text-xl font-medium">
                        {Array.isArray(responseNumber)
                            ? (
                                <div className="space-y-2">
                                    {responseNumber.map((item, index) => (
                                        <p key={index}>{item}</p>
                                    ))}
                                </div>
                            )
                            : (responseNumber || "Not detected")}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Demo;

