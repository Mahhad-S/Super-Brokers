import React from 'react';
import { useState } from "react";
import { Link } from "react-router-dom";
import "./style/Dashboard.css";

function Dashboard() {
    return (
        <div className="dashboard-main-wrapper">
            {/* Hot Bar at the top with brown background */}
            <div className="dashboard-hot-bar">
                <div className="dashboard-row">
                    {/* Logo on the left */}
                    <div className="dashboard-logo-img">
                        <img src="/images/Sb-logo.png" alt="Logo"/>
                    </div>
                    {/* Tabs as Buttons */}
                    <div className="dashboard-nav-col">
                        <Link to="/Dashboard" className="dashboard-tab-link" >DASHBOARD</Link>
                    </div>
                    <div className="dashboard-nav-col">
                        <Link to="/About" className="dashboard-tab-link" >ABOUT</Link>
                    </div>
                    <div className="dashboard-nav-col">
                        <Link to="/Help" className="dashboard-tab-link" >HELP</Link>
                    </div>
                </div>
            </div>
            {/* Main content area with blurred background */}
            <div className="dashboard-main-content" >
                <div className="dashboard-content-left">
                    {/* Row 1 - Search Bar */}
                    <div className="dashboard-search-bar">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Search..." 
                        />
                        <button className="dashboard-search-button">Search</button>
                    </div>
                    <div className="dashboard-stock-name"> STOCK</div>
                    <div className="dashboard-row-content">Row 1</div>
                    <div className="dashboard-row-content">Row 2</div>
                    <div className="dashboard-row-content">Row 3</div>
                </div>
                <div className="dashboard-content-right">
                    <div className="dashboard-bubble">Bubble 1</div>
                    <div className="dashboard-bubble">Bubble 2</div>
                    <div className="dashboard-bubble">Bubble 3</div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
