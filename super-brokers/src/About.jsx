import React from 'react';
import { useState } from "react";
import { Link } from "react-router-dom";
import "./style/About.css";

function About() {
    return (
        <div className="about-main-wrapper">
            {/* Top Navigation Bar */}
            <div className="about-hot-bar">
                <div className="about-logo-img">
                    <img src="/images/Sb-logo.png" alt="Logo" />
                </div>
                {/* Navigation Links */}
                <div className="about-nav-links">
                    <Link to="/Dashboard" className="about-tab-link">Dashboard</Link>
                    <Link to="/About" className="about-tab-link">About</Link>
                    <Link to="/Help" className="about-tab-link">Help</Link>
                </div>
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