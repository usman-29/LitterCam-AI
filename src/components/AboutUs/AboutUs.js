import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
    return (
        <section className="about-us" id="about">
            <div className="left-side">
                <h2>About Us</h2>
                <p>
                    At LitterCam AI, we harness cutting-edge technology to foster a cleaner, sustainable environment. Our mission is to combat littering with innovative AI-driven solutions.
                </p>
                <h3>Our Vision</h3>
                <p>
                    We envision a litter-free world, promoting a healthier planet for future generations. By integrating advanced detection technologies with community engagement, we strive to raise awareness and drive positive change.
                </p>
                <h3>Our Technology</h3>
                <p>
                    LitterCam AI employs YOLOv8 object detection and Optical Character Recognition (OCR) to identify littering incidents. Our system tracks vehicles and license plates, fostering accountability and community collaboration for cleaner environments.
                </p>
            </div>
            <div className="right-side">
                <img src={require('../../assets/images/litter_instance.png')} alt="LitterCam AI instance" />
            </div>
        </section>
    );
};

export default AboutUs;
