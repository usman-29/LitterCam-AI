// App.js
import React from 'react';
import './App.css'; // You can style the page in this file
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home/Home';
import Demo from './pages/Demo/Demo';

const App = () => {
  return (
    <BrowserRouter>
      <div className="homepage">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demo" element={<Demo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
