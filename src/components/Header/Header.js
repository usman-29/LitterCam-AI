import React from 'react';
import './Header.css';
import { useLocation, Link } from 'react-router-dom';

const Header = () => {
    const location = useLocation();

    return (
        <header className="header">
            <div className="navbar">
                <h1 className="logo">LitterCam AI</h1>
                <nav>
                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        {location.pathname !== '/demo' && (
                            <>

                                <li><Link to="#features">Features</Link></li>
                                <li><Link to="/demo">Demo</Link></li>
                                <li><Link to="#about">About</Link></li>
                                <li><Link to="#contact">Contact</Link></li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;