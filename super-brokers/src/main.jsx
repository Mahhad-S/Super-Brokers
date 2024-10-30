import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import Home from './Home.jsx';
import Dashboard from './Dashboard.jsx';
<<<<<<< HEAD

=======
import About from './About.jsx';
import Help from './Help.jsx';
>>>>>>> d458d8e9c9ce668365aac15352ce1135f248195f
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Dashboard" element={<Dashboard />} />
<<<<<<< HEAD
=======
        <Route path="/About" element={<About />} />
        <Route path="/Help" element={<Help />} />
>>>>>>> d458d8e9c9ce668365aac15352ce1135f248195f
      </Routes>
    </Router>
  </StrictMode>
);
