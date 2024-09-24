import React from 'react';
import './FeatureSection.css';

const features = [
    {
        title: 'Littering Instance Detection',
        description: 'Detects the  instance of littering.',
    },
    {
        title: 'License Plate Detection',
        description: 'Identify littering vehicles with precision.',
    },
    {
        title: 'Seamless Integration',
        description: 'Works with existing surveillance infrastructure.',
    },
];

const FeatureSection = () => {
    return (
        <section className="features" id="features">
            <h2>Features</h2>
            <div className="feature-list">
                {features.map((feature, index) => (
                    <div className="feature-item" key={index}>
                        <h4>{feature.title}</h4>
                        <p>{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeatureSection;