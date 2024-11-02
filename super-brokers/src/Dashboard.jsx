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

            {/* Positions and Following bubbles positioned outside the main blurred content */}
            <div className="dashboard-positions-following">
            <h3>Positions</h3>
                <div className="dashboard-left-bubble">
                    {/* Content for Positions can go here */}
                </div>
                <h3>Following</h3>
                <div className="dashboard-left-bubble">
                    {/* Content for Following can go here */}
                </div>
            </div>

            {/* Main content area with blurred background */}
            <div className="dashboard-main-content">
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
                </div>

                {/* Right section with Buy/Sell Panel and Stacked News */}
                <div className="dashboard-content-right">
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
                    
                    {/* Stacked News Bubbles */}
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
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

