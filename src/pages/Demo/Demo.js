// App.js
import React from 'react';
import './Demo.css'; // You can style the page in this file
import Header from '../../components/Header/Header';
import ContactUs from '../../components/ContactUs/ContactUs';
import DemoVideo from '../../components/DemoVideo/DemoVideo';

const Demo = () => {
    return (
        <div className="demo-container">
            <Header />
            <DemoVideo />
            <ContactUs />
        </div>
    );
}

export default Demo;