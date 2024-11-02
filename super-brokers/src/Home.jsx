import React from 'react';
import { Link } from "react-router-dom";
import './CSS/Home.css';

function Home() {
    return (
        <div className="container">
            {/* Hot Bar at the top */}
            <div className="hot-bar">
                <div className="row align-items-center no-gutters">
                    {/* Logo */}
                    <div className="col-auto logo-container">
                        <img 
                            src="/images/Sb-logo.png" 
                            alt="Logo" 
                            className="logo"
                        />
                    </div>

                    {/* Tabs as Buttons */}
                    <div className="col-auto tab-container">
                        <Link to="/Dashboard" className="folder-tab">DASHBOARD</Link>
                    </div>
                    <div className="col-auto tab-container">
                        <Link to="/About" className="folder-tab">ABOUT</Link>
                    </div>
                    <div className="col-auto tab-container">
                        <Link to="/Help" className="folder-tab">HELP</Link>
                    </div>
                </div>
            </div>

            {/* Main content area */}
            <div className="content-area">
                {/* Left Side: Search bar and rows */}
                <div className="left-section">
                    {/* Search Bar */}
                    <div className="search-bar">
                        <input type="text" className="form-control" placeholder="Search..." />
                        <button className="btn btn-primary ms-2">Search</button>
                    </div>

                    <div className="section-title">STOCK</div>

                    {/* Rows */}
                    <div className="row-item">Row 1</div>
                    <div className="row-item">Row 2</div>
                    <div className="row-item">Row 3</div>
                </div>

                {/* Right Side: Bubbles */}
                <div className="right-section">
                    <div className="bubble">Bubble 1</div>
                    <div className="bubble">Bubble 2</div>
                    <div className="bubble">Bubble 3</div>
                </div>
            </div>
        </div>
    );
}

export default Home;
