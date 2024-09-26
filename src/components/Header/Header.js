import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="navbar">
                <h1 className="logo">LitterCam AI</h1>
                <nav>
                    <ul className="nav-links">
                        <li><a href="/">Home</a></li>
                        <li><a href="#features">Features</a></li>
                        <li><a href="">Test</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>

            </div>
        </header>

    );
};

export default Header;