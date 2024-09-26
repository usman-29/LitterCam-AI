// App.js
import React from 'react';
import './Demo.css'; // You can style the page in this file
import Header from '../../components/Header/Header';
import ContactUs from '../../components/ContactUs/ContactUs';

const Demo = () => {
    return (
        <div className="demo-container">
            <Header />
            <ContactUs />
        </div>
    );
}

export default Demo;