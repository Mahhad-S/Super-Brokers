import React from 'react';
import { useState } from "react";
import { NavLink } from 'react-router-dom';
import "./style/About.css";

function About() {
    const [showDropdown, setShowDropdown] = useState(false);
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }; 
    
    return (
        <div className="about-main-wrapper">
            {/* Top Navigation Bar */}
            <div className="about-hot-bar">
                <div className="about-logo-img">
                    <img src="/images/Sb-logo.png" alt="Logo" />
                </div>
                {/* Navigation Links */}
                <div className="about-nav-links">
                    <NavLink to="/Dashboard" className={({ isActive }) => isActive ? "about-tab-link active" : "about-tab-link"}>
                        Dashboard
                    </NavLink>
                    <NavLink to="/About" className={({ isActive }) => isActive ? "about-tab-link active" : "about-tab-link"}>
                        About
                    </NavLink>
                    <NavLink to="/Help" className={({ isActive }) => isActive ? "about-tab-link active" : "about-tab-link"}>
                        Help
                    </NavLink>
                    <NavLink to="/Portfolio" className={({ isActive }) => isActive ? "about-tab-link active" : "about-tab-link"}>
                        Portfolio
                    </NavLink>
                </div>
                <button className="dashboard-user" onClick={toggleDropdown}>
                    <img src="/images/SB-logo.png" alt="User Icon" />
                </button>
                {showDropdown && (
                    <div className="about-dropdown-menu">
                        <NavLink to="/" className="about-dropdown-item">Home</NavLink>
                        <NavLink to="/login" className="about-dropdown-item">Login</NavLink>
                        <NavLink to="/register" className="about-dropdown-item">Sign Up</NavLink>
                        <NavLink to="" className="about-dropdown-item">Log Out</NavLink>
                    </div>
                )}
            </div>

            {/* Main content area with blurred background */}
            <div className="about-main-content" >
                <div className='about-title-col'>
                    <h1>Stock Trading Assistant</h1>
                </div>
                <div className='about-paragrah-col'>
                    <p>Enhance your stock trading knowledge with our Stock Bot.
                        Learn the essentials of buying and selling stocks through interactive,
                        real-time guidance tailored to help you make informed decisions in the market.
                    </p>
                </div>
                <div className='about-video-col'>
                   <iframe src='/images/aboutImportantVideo.mp4' title='Important Video' sandbox="" allowFullScreen></iframe>
                </div>
            </div>
        </div>
    );
}


export default About;