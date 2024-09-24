import React from 'react';
import './Body.css';
import backgroundImage from '../../assets/images/background.jpg';

const Body = () => {
    return (
        <section className="body_main" style={{ '--background-image': `url(${backgroundImage})` }}>
            <div className="body-content">
                <h2>LitterCam AI</h2>
                <p className="tagline">AI-powered solution to combat littering</p>
                <p className="subheading">
                    Improve environmental quality and reduce the risk of litter clearance with
                    <span className="highlight"> Artificial Intelligence</span>.
                </p>
                <p className="description">
                    The complete vehicle-based littering solution for street scene, enforcement and highways maintenance professionals.
                </p>
            </div>
        </section>
    );
};

export default Body;