import React from 'react';
import { useState } from "react";
import { NavLink } from 'react-router-dom';
import "./style/Dashboard.css";

function Dashboard() { 
    const [showDropdown, setShowDropdown] = useState(false);
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }; 

    return (
        <div className="dashboard-main-wrapper">
            {/* Top Navigation Bar */}
            <div className="dashboard-hot-bar">
                <div className="dashboard-logo-img">
                    <img src="/images/Sb-logo.png" alt="Logo" />
                </div>
                {/* Navigation Links */}
                <div className="dashboard-nav-links">
                    <NavLink to="/Dashboard" className={({ isActive }) => isActive ? "dashboard-tab-link active" : "dashboard-tab-link"}>
                        Dashboard
                    </NavLink>
                    <NavLink to="/About" className={({ isActive }) => isActive ? "dashboard-tab-link active" : "dashboard-tab-link"}>
                        About
                    </NavLink>
                    <NavLink to="/Help" className={({ isActive }) => isActive ? "dashboard-tab-link active" : "dashboard-tab-link"}>
                        Help
                    </NavLink>
                    <NavLink to="/Portfolio" className={({ isActive }) => isActive ? "dashboard-tab-link active" : "dashboard-tab-link"}>
                        Portfolio
                    </NavLink>
                </div>
                <button className="dashboard-user" onClick={toggleDropdown}>
                    <img src="/images/SB-logo.png" alt="User Icon" />
                </button>
                {showDropdown && (
                    <div className="dashboard-dropdown-menu">
                        <NavLink to="/" className="dashboard-dropdown-item">Home</NavLink>
                        <NavLink to="/login" className="dashboard-dropdown-item">Login</NavLink>
                        <NavLink to="/register" className="dashboard-dropdown-item">Sign Up</NavLink>
                        <NavLink to="" className="dashboard-dropdown-item">Log Out</NavLink>
                    </div>
                )}
            </div>

            <div className="dashboard-body-content">
                {/* Positions-Following Sidebar */}
                <aside className="dashboard-sidebar-content">
                    <h3>Positions</h3>
                    <div className="dashboard-left-bubble">
                        {/* Content for Positions can go here */}
                    </div>
                    <h3>Following</h3>
                    <div className="dashboard-left-bubble">
                        {/* Content for Following can go here */}
                    </div>
                </aside>

                <section className="dashboard-main-content">

                    <section className="dashboard-main-left">
                        <section className="dashboard-sub-top">
                            <input 
                                type="text" 
                                className="dashboard-search-bar"
                                placeholder="Search..." 
                            />
                            <div className="dashboard-stock-name"> STOCK</div>
                        </section>
                        <section className="dashboard-sub-left">
                            <div className="dashboard-row-content">
                                <div className="dashboard-three-column">
                                    <div className="dashboard-column">Open: $XX.XX</div>
                                    <div className="dashboard-column">Mkt. Cap: $XXXB</div>
                                    <div className="dashboard-column">52 wk. High: $XX.XX</div>
                                </div>
                                <div className="dashboard-three-column">
                                    <div className="dashboard-column">High: $XX.XX</div>
                                    <div className="dashboard-column">P/E Ratio: XX.XX</div>
                                    <div className="dashboard-column">52 wk. Low: $XX.XX</div>
                                </div>
                                <div className="dashboard-three-column">
                                    <div className="dashboard-column">Low: $XX.XX</div>
                                    <div className="dashboard-column">Div Yield: XX%</div>
                                    <div className="dashboard-column">Volume: XXXM</div>
                                </div>
                            </div>
                            <div className="dashboard-row-content">
                                <h3>COMPANY / Stock Summary will go here</h3> 
                                <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Consectetur nulla sodales mattis, ridiculus luctus vehicula dolor. Pretium litora parturient mi vitae 
                                    sed consequat sagittis; at nullam. Eros eros vehicula lorem dui id viverra hendrerit. Dolor convallis euismod justo; netus ligula imperdiet rutrum maximus.</p>
                                <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Consectetur nulla sodales mattis, ridiculus luctus vehicula dolor. Pretium litora parturient mi vitae 
                                    sed consequat sagittis; at nullam. Eros eros vehicula lorem dui id viverra hendrerit. Dolor convallis euismod justo; netus ligula imperdiet rutrum maximus.</p>
                            </div>
                        </section>
                        <section className="dashboard-sub-right">
                            <div className="dashboard-buy-sell-panel">
                                <div className="tab-button active">Buy</div>
                                <div className="tab-button">Sell</div>
                                <div>
                                    <p>Curr. Price/Share: $x.xx</p>
                                    <p>Buying Power (User): $x.xx</p>
                                    <input type="number" placeholder="Buy Amount (Shares)" style={{ width: "100%", fontSize: "0.8rem" }} />
                                    <p>Avg. Cost Per Share: $x.xx</p>
                                    <p>Total Cost: $x.xx</p>
                                    <button className="dashboard-purchase-button">Purchase</button>
                                </div>
                            </div>
                        </section>
                    </section>

                    <section className="dashboard-main-right">
                        <div className="dashboard-news-bubble">
                            <h3>New 1</h3>
                            <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Lectus leo praesent fringilla iaculis rutrum; magna facilisi. </p>
                        </div>
                        <div className="dashboard-news-bubble">
                            <h3>New 2</h3>
                            <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Lectus leo praesent fringilla iaculis rutrum; magna facilisi. </p>
                        </div>
                        <div className="dashboard-news-bubble">
                            <h3>New 3</h3>
                            <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Lectus leo praesent fringilla iaculis rutrum; magna facilisi. </p>
                        </div>
                    </section>
                </section>
            </div>

            {/* Main content area with blurred background */}
        </div>
    );
}

export default Dashboard;

