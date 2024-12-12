import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Demo from './pages/Demo';
import Features from './pages/Features';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          {/* Default route */}
          <Route path="/" element={<Home />} />
          {/* Features route */}
          <Route path="/features" element={<Features />} />
          {/* Demo route */}
          <Route path="/demo" element={<Demo />} />
          {/* About Us route */}
          <Route path="/about" element={<About />} />
          {/* Contact Us Us route */}
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
