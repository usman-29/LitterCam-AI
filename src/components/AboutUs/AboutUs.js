import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
    return (
        <section className="about-us">
            <div className="left-side">
                <h2>About Us</h2>
                <p>
                    We are undergrad students at Bahria University and we are creating this LitterCam AI project.
                </p>
                <p>
                    Considering Highways Pakistan’s number one imperative is to reduce the number of people killed or seriously injured and to achieve year on year efficiency savings of 10%, LitterCam can play a valuable role by reducing the exposure of litter clearance teams to risk and the cost of litter clearance.
                </p>
            </div>
            <div className="right-side">
                <img src={require('../../assets/images/litter_instance.png')} alt="LitterCam AI instance" />
            </div>
        </section>
    );
};

export default AboutUs;
