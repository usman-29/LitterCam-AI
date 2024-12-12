import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
    return (
        <div id="about" className="flex flex-col md:flex-row items-center justify-between p-12 bg-white gap-5">
            {/* Left Section (Text) */}
            <div className="text-black w-full md:w-1/2 flex flex-col justify-center">
                <h2 className="text-3xl font-semibold mb-4">About Us</h2>
                <p className="text-lg text-gray-900 mb-6">
                    At LitterCam AI, we're a dynamic duo of innovators from Bahria University, comprised of Usman and Matee. We're passionate about harnessing the power of cutting-edge technology to create a cleaner, more sustainable environment.                </p>
                <h3 className="text-2xl font-medium mb-2">Our Vision</h3>
                <p className="text-lg text-gray-900 mb-6">
                    We envision a litter-free world, promoting a healthier planet for future generations. By integrating advanced detection technologies with community engagement, we strive to raise awareness and drive positive change.
                </p>
                <h3 className="text-2xl font-medium mb-2">Our Technology</h3>
                <p className="text-lg text-gray-900">
                    LitterCam AI employs YOLOv8 object detection and Optical Character Recognition (OCR) to identify littering incidents. Our system tracks vehicles and license plates, fostering accountability and community collaboration for cleaner environments.
                </p>
            </div>

            {/* Right Section (Image) */}
            <div className="w-full md:w-1/2 flex justify-center items-center">
                <img
                    src={assets.litter_instance}
                    alt="LitterCam AI instance"
                    className="w-auto h-auto rounded-lg"
                />
            </div>
        </div>
    )
}

export default About
