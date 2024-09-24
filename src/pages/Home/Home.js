// App.js
import React from 'react';
import './Home.css'; // You can style the page in this file
import Header from '../../components/Header/Header';
import Body from '../../components/Body/Body';
import FeatureSection from '../../components/FeatureSection/FeatureSection';
import AboutUs from '../../components/AboutUs/AboutUs';
import ContactUs from '../../components/ContactUs/ContactUs';

const Home = () => {
    return (
        <div className="home-container">
            <Header />
            <Body />
            <FeatureSection />
            <AboutUs />
            <ContactUs />
        </div>
    );
}

export default Home;