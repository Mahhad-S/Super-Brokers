import React from 'react';
import { useState } from "react";
import { Link } from "react-router-dom";
import "./style/Home.css";

function Home() {
    return (
        <div className="home-main-wrapper">
            {/* Hot Bar at the top with brown background */}
            <div className="home-hot-bar">
                <div className="home-row">
                    {/* Logo on the left */}
                    <div className="home-logo-img">
                        <img src="/images/Sb-logo.png" alt="Logo"/>
                    </div>
                    {/* Tabs as Buttons */}
                    <div className="home-nav-col">
                        <Link to="/Dashboard" className="home-tab-link" >DASHBOARD</Link>
                    </div>
                    <div className="home-nav-col">
                        <Link to="/About" className="home-tab-link" >ABOUT</Link>
                    </div>
                    <div className="home-nav-col">
                        <Link to="/Help" className="home-tab-link" >HELP</Link>
                    </div>
                </div>
            </div>
            {/* Main content area with blurred background */}
            <div className="home-main-content" >
                <div className="home-content-left">
                    {/* Row 1 - Search Bar */}
                    <div className="home-search-bar">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Search..." 
                        />
                        <button className="home-search-button">Search</button>
                    </div>
                    <div className="home-stock-name"> STOCK</div>
                    <div className="home-row-content">Row 1</div>
                    <div className="home-row-content">Row 2</div>
                    <div className="home-row-content">Row 3</div>
                </div>
                <div className="home-content-right">
                    <div className="home-bubble">Bubble 1</div>
                    <div className="home-bubble">Bubble 2</div>
                    <div className="home-bubble">Bubble 3</div>
                </div>
            </div>
        </div>
    );
}

export default Home;