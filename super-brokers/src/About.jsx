import React from 'react';
import { useState } from "react";
import { Link } from "react-router-dom";
import "./style/About.css";

function About() {
    return (
        <div className="about-main-wrapper">
            {/* Hot Bar at the top with brown background */}
            <div className="about-hot-bar">
                <div className="about-row">
                    {/* Logo on the left */}
                    <div className="about-logo-img">
                        <img src="/images/Sb-logo.png" alt="Logo"/>
                    </div>
                    {/* Tabs as Buttons */}
                    <div className="about-nav-col">
                        <Link to="/Dashboard" className="about-tab-link" >DASHBOARD</Link>
                    </div>
                    <div className="about-nav-col">
                        <Link to="/About" className="about-tab-link" >ABOUT</Link>
                    </div>
                    <div className="about-nav-col">
                        <Link to="/Help" className="about-tab-link" >HELP</Link>
                    </div>
                </div>
            </div>
            {/* Main content area with blurred background */}
            <div className="about-main-content" >
                
            </div>
        </div>
    );
}


export default About;